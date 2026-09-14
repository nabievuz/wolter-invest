import {
  MODEL,
  CLUSTER_CAPEX,
  simulate,
  SCENARIOS,
  usd,
  pct,
} from "@/lib/model";

describe("Wolter Invest financial model", () => {
  it("cluster CapEx equals the documented $14,710", () => {
    expect(CLUSTER_CAPEX).toBe(14710);
    // = cabinet 3300 + 14*410 bikes + 21*270 batteries
    expect(CLUSTER_CAPEX).toBe(
      MODEL.cabinetPrice +
        MODEL.bikesPerCluster * MODEL.bikePrice +
        MODEL.batteriesPerCluster * MODEL.batteryPrice,
    );
  });

  it("full round of 30 clusters costs $441,300", () => {
    expect(CLUSTER_CAPEX * MODEL.maxClusters).toBe(441300);
  });

  it("base case (1 cluster) matches the published return figures", () => {
    const r = simulate(1, "BASE");
    expect(r.capexUsd).toBe(14710);
    expect(r.payback).toBe(14); // months
    expect(Math.round((r.irr ?? 0) * 100)).toBe(75); // IRR %
    expect(Math.round(r.roi * 100)).toBe(108); // 4-yr ROI %
    expect(r.rows).toHaveLength(MODEL.term);
  });

  it("runs the full 48-month term and reaches payback within term", () => {
    for (const s of SCENARIOS) {
      const r = simulate(3, s);
      expect(r.rows).toHaveLength(48);
      expect(r.payback).toBeGreaterThan(0);
      expect(r.payback).toBeLessThanOrEqual(MODEL.term);
    }
  });

  it("upside beats base beats conservative on total payout", () => {
    const cons = simulate(1, "CONS").totalUsd;
    const base = simulate(1, "BASE").totalUsd;
    const up = simulate(1, "UP").totalUsd;
    expect(up).toBeGreaterThan(base);
    expect(base).toBeGreaterThan(cons);
  });

  it("formatters render currency and percent as expected", () => {
    expect(usd(14710)).toBe("$14,710");
    expect(pct(0.75)).toBe("75%");
  });

  it("changes the share only after the actual capital recovery month", () => {
    const result = simulate(1, "BASE");
    expect(result.rows[12].cumUsd).toBeLessThan(result.capexUsd);
    expect(result.rows[13].cumUsd).toBeGreaterThanOrEqual(result.capexUsd);
    expect(result.rows[13].phase).toBe(1);
    expect(result.rows[14].phase).toBe(2);
    expect(result.rows[14].payUsd / result.rows[13].payUsd).toBeCloseTo(
      3 / 7,
      10,
    );
    expect(result.phase2IncomeUsd).toBeCloseTo(result.rows[14].payUsd, 10);
  });

  it("does not report recovery at month 48 when capital remains unpaid", () => {
    const result = simulate(1, "BASE", 0.25);
    expect(result.payback).toBeNull();
    expect(result.totalUsd).toBeCloseTo(12847.23, 1);
    expect(result.netGainUsd).toBeLessThan(0);
    expect(result.rows.every((row) => row.phase === 1)).toBe(true);
  });

  it("handles zero profit without a fabricated payback or IRR", () => {
    const result = simulate(1, "BASE", 0);
    expect(result.payback).toBeNull();
    expect(result.irr).toBeNull();
    expect(result.totalUsd).toBe(0);
    expect(result.roi).toBe(-1);
    expect(result.netGainUsd).toBe(-14710);
  });

  it("keeps capital and receipts distinct and scales the same cash flows", () => {
    const one = simulate(1, "BASE");
    const thirty = simulate(30, "BASE");
    expect(one.netGainUsd).toBeCloseTo(one.totalUsd - one.capexUsd, 8);
    expect(thirty.totalUsd).toBeCloseTo(one.totalUsd * 30, 8);
    expect(thirty.payback).toBe(one.payback);
    expect(thirty.irr).toBeCloseTo(one.irr!, 6);
  });

  it("rejects invalid capital and profit inputs", () => {
    for (const clusters of [0, -1, 1.5, 31, NaN]) {
      expect(() => simulate(clusters, "BASE")).toThrow(RangeError);
    }
    for (const multiplier of [-1, NaN, Infinity, 2.1]) {
      expect(() => simulate(1, "BASE", multiplier)).toThrow(RangeError);
    }
  });
});
