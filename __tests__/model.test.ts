import {
  MODEL,
  CLUSTER_CAPEX,
  simulate,
  SCENARIOS,
  usd,
  pct
} from '@/lib/model';

describe('Wolter Invest financial model', () => {
  it('cluster CapEx equals the documented $14,710', () => {
    expect(CLUSTER_CAPEX).toBe(14710);
    // = cabinet 3300 + 14*410 bikes + 21*270 batteries
    expect(CLUSTER_CAPEX).toBe(
      MODEL.cabinetPrice +
        MODEL.bikesPerCluster * MODEL.bikePrice +
        MODEL.batteriesPerCluster * MODEL.batteryPrice
    );
  });

  it('full round of 30 clusters costs $441,300', () => {
    expect(CLUSTER_CAPEX * MODEL.maxClusters).toBe(441300);
  });

  it('base case (1 cluster) matches the published return figures', () => {
    const r = simulate(1, 'BASE');
    expect(r.capexUsd).toBe(14710);
    expect(r.payback).toBe(14); // months
    expect(Math.round((r.irr ?? 0) * 100)).toBe(75); // IRR %
    expect(Math.round(r.roi * 100)).toBe(108); // 4-yr ROI %
    expect(r.rows).toHaveLength(MODEL.term);
  });

  it('runs the full 48-month term and reaches payback within term', () => {
    for (const s of SCENARIOS) {
      const r = simulate(3, s);
      expect(r.rows).toHaveLength(48);
      expect(r.payback).toBeGreaterThan(0);
      expect(r.payback).toBeLessThanOrEqual(MODEL.term);
    }
  });

  it('upside beats base beats conservative on total payout', () => {
    const cons = simulate(1, 'CONS').totalUsd;
    const base = simulate(1, 'BASE').totalUsd;
    const up = simulate(1, 'UP').totalUsd;
    expect(up).toBeGreaterThan(base);
    expect(base).toBeGreaterThan(cons);
  });

  it('formatters render currency and percent as expected', () => {
    expect(usd(14710)).toBe('$14,710');
    expect(pct(0.75)).toBe('75%');
  });
});
