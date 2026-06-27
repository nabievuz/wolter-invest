// Wolter Invest — verified financial model.
// Mirrors the approved single-file prototype and the Excel investor model.
// CapEx prices (2026-06): cabinet $3,300, e-bike $410, battery $270; FX 12,000 UZS/USD.

export type Scenario = 'CONS' | 'BASE' | 'UP';

export const MODEL = {
  fx: 12000, // illustrative UZS/USD rate for USD display
  cabinetPrice: 3300,
  bikePrice: 410,
  batteryPrice: 270,
  bikesPerCluster: 14,
  batteriesPerCluster: 21,
  maxClusters: 30,
  swapNetPerCluster: ((252468870 / 48) * 30) / 14 * (1 - 0.459),
  bikeNetPerCluster: ((134677000 / 18) * 30) / 200 * 14 * (1 - 0.1 - 0.12),
  coeff: { CONS: 0.85, BASE: 1.0, UP: 1.15 } as Record<Scenario, number>,
  term: 48, // months
  p1: 0.7, // investor share until payback
  p2: 0.3 // investor share after payback
} as const;

// One cluster's capital cost = $14,710
export const CLUSTER_CAPEX =
  MODEL.cabinetPrice +
  MODEL.bikesPerCluster * MODEL.bikePrice +
  MODEL.batteriesPerCluster * MODEL.batteryPrice;

export const CLUSTER_NET = MODEL.swapNetPerCluster + MODEL.bikeNetPerCluster;

function npv(rate: number, cf: number[]): number {
  let s = 0;
  for (let t = 0; t < cf.length; t++) s += cf[t] / Math.pow(1 + rate, t);
  return s;
}

function irr(cf: number[]): number | null {
  let lo = -0.9;
  let hi = 3;
  let flo = npv(lo, cf);
  if (flo * npv(hi, cf) > 0) return null;
  for (let i = 0; i < 300; i++) {
    const m = (lo + hi) / 2;
    const fm = npv(m, cf);
    if (Math.abs(fm) < 1e-2) return m;
    if (flo * fm < 0) hi = m;
    else {
      lo = m;
      flo = fm;
    }
  }
  return (lo + hi) / 2;
}

export interface SimRow {
  m: number;
  payUsd: number;
  cumUsd: number;
  phase: 1 | 2;
}

export interface SimResult {
  capexUsd: number;
  payback: number; // months to full payback
  monthlyIncomeUsd: number; // phase-1 monthly income
  totalUsd: number; // total payout over the term
  roi: number; // 4-year ROI
  irr: number | null; // annualized IRR
  rows: SimRow[];
}

/**
 * Simulate `clusters` over the 48-month term under a scenario.
 * Investor gets 70% of monthly net profit until cumulative payout covers
 * CapEx, then 30% for the remainder of the term.
 */
export function simulate(clusters: number, scenario: Scenario): SimResult {
  const capexUsd = clusters * CLUSTER_CAPEX;
  const capexUzs = capexUsd * MODEL.fx;
  const mult = MODEL.coeff[scenario];
  const monthlyNet = clusters * CLUSTER_NET * mult;

  let cum = 0;
  let payback: number | null = null;
  const cf = [-capexUzs];
  const rows: SimRow[] = [];

  for (let m = 1; m <= MODEL.term; m++) {
    const phase1 = cum < capexUzs;
    const pay = (phase1 ? MODEL.p1 : MODEL.p2) * monthlyNet;
    cum += pay;
    if (payback === null && cum >= capexUzs) payback = m;
    cf.push(pay);
    rows.push({ m, payUsd: pay / MODEL.fx, cumUsd: cum / MODEL.fx, phase: phase1 ? 1 : 2 });
  }

  const monthlyIrr = irr(cf);
  return {
    capexUsd,
    payback: payback ?? MODEL.term,
    monthlyIncomeUsd: (MODEL.p1 * monthlyNet) / MODEL.fx,
    totalUsd: cum / MODEL.fx,
    roi: (cum - capexUzs) / capexUzs,
    irr: monthlyIrr === null ? null : Math.pow(1 + monthlyIrr, 12) - 1,
    rows
  };
}

export const SCENARIOS: Scenario[] = ['CONS', 'BASE', 'UP'];

export const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
export const pct = (n: number) => Math.round(n * 100) + '%';
