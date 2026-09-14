"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  simulate,
  MODEL,
  pct,
  type Scenario,
  type SimResult,
} from "@/lib/model";

type Currency = "USD" | "UZS";
const PRESETS = [1, 5, 15, 30];

function Chart({
  sim,
  money,
  label,
  capital,
}: {
  sim: SimResult;
  money: (n: number) => string;
  label: string;
  capital: string;
}) {
  const W = 800,
    H = 240,
    left = 2,
    right = W - 2,
    top = 32,
    bottom = H - 14;
  const max = Math.max(sim.capexUsd, sim.totalUsd) * 1.2;
  const x = (m: number) => left + (m / MODEL.term) * (right - left);
  const y = (amount: number) => bottom - (amount / max) * (bottom - top);
  const points = [{ m: 0, cumUsd: 0 }, ...sim.rows];
  const line = points
    .map((p, i) => `${i ? "L" : "M"} ${x(p.m)} ${y(p.cumUsd)}`)
    .join(" ");
  const paybackRow =
    sim.payback === null ? undefined : sim.rows[sim.payback - 1];
  return (
    <svg
      className="return-chart"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      <defs>
        <linearGradient id="return-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d3f36b" stopOpacity=".22" />
          <stop offset="100%" stopColor="#d3f36b" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((n) => (
        <line
          key={n}
          x1={left}
          x2={right}
          y1={y(max * n)}
          y2={y(max * n)}
          stroke="#ffffff0c"
        />
      ))}
      <line
        x1={left}
        x2={right}
        y1={y(sim.capexUsd)}
        y2={y(sim.capexUsd)}
        stroke="#9ba29a"
        strokeDasharray="4 5"
      />
      <text
        x={right}
        y={y(sim.capexUsd) - 9}
        textAnchor="end"
        fill="#b9c0b4"
        fontSize="12"
      >
        {capital} · {money(sim.capexUsd)}
      </text>
      <path
        d={`${line} L ${right} ${bottom} L ${left} ${bottom} Z`}
        fill="url(#return-fill)"
      />
      <path
        d={line}
        fill="none"
        stroke="#d3f36b"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {paybackRow && (
        <>
          <line
            x1={x(paybackRow.m)}
            x2={x(paybackRow.m)}
            y1={y(paybackRow.cumUsd)}
            y2={bottom}
            stroke="#d3f36b66"
            strokeDasharray="3 5"
          />
          <circle
            cx={x(paybackRow.m)}
            cy={y(paybackRow.cumUsd)}
            r="5"
            fill="#d3f36b"
          />
        </>
      )}
      <circle cx={right} cy={y(sim.totalUsd)} r="4" fill="#d3f36b" />
    </svg>
  );
}

export default function Calculator() {
  const t = useTranslations("calc");
  const [clusters, setClusters] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("BASE");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [stress, setStress] = useState<number | null>(null);
  const sim = simulate(clusters, scenario, stress ?? undefined);
  const money = (n: number) =>
    currency === "USD"
      ? "$" + Math.round(n).toLocaleString("en-US")
      : Math.round(n * MODEL.fx)
          .toLocaleString("en-US")
          .replaceAll(",", " ") + " UZS";
  const isRecovered = sim.payback !== null;
  const hasSecondPhase = sim.rows.some((row) => row.phase === 2);
  const scenarios: { id: Scenario; key: string; value: string }[] = [
    { id: "CONS", key: "lower", value: "−15%" },
    { id: "BASE", key: "base", value: "100%" },
    { id: "UP", key: "upper", value: "+15%" },
  ];

  return (
    <div className="calculator">
      <div className="calc-layout">
        <div className="calc-controls">
          <div className="control-label">
            <label htmlFor="cluster-range">{t("clusters")}</label>
            <span>{String(clusters).padStart(2, "0")}</span>
          </div>
          <div className="investment-readout">
            <strong>{money(sim.capexUsd)}</strong>
            <span>{t("unit", { count: clusters })}</span>
          </div>
          <input
            id="cluster-range"
            type="range"
            min="1"
            max={MODEL.maxClusters}
            step="1"
            value={clusters}
            onChange={(e) => setClusters(Number(e.target.value))}
          />
          <div className="presets">
            {PRESETS.map((n) => (
              <button
                key={n}
                aria-pressed={clusters === n}
                onClick={() => setClusters(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <fieldset className="currency-control">
            <legend>{t("currency")}</legend>
            <div className="segmented">
              {(["USD", "UZS"] as const).map((unit) => (
                <button
                  key={unit}
                  aria-pressed={currency === unit}
                  onClick={() => setCurrency(unit)}
                >
                  {t(unit.toLowerCase())}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>{t("scenario")}</legend>
            <div className="scenarios">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  aria-pressed={stress === null && scenario === s.id}
                  onClick={() => {
                    setScenario(s.id);
                    setStress(null);
                  }}
                >
                  <span>{t(s.key)}</span>
                  <strong>{s.value}</strong>
                </button>
              ))}
            </div>
            <p className="control-note">{t("scenarioNote")}</p>
          </fieldset>
          <details className="stress-control">
            <summary>
              {t("stress")}
              <span aria-hidden="true">+</span>
            </summary>
            <div>
              <label htmlFor="stress-range">
                {t("stressLabel")}
                <strong>
                  {Math.round((stress ?? MODEL.coeff[scenario]) * 100)}%
                </strong>
              </label>
              <input
                id="stress-range"
                type="range"
                min="0"
                max="125"
                step="5"
                value={Math.round((stress ?? MODEL.coeff[scenario]) * 100)}
                onChange={(e) => setStress(Number(e.target.value) / 100)}
              />
              <p className="control-note">{t("stressNote")}</p>
              <button
                className="reset-button"
                onClick={() => {
                  setStress(null);
                  setScenario("BASE");
                }}
              >
                {t("reset")} ↗
              </button>
            </div>
          </details>
        </div>
        <div className="calc-results">
          <div className="payment-grid" aria-live="polite" aria-atomic="true">
            <div className="payment first">
              <span>{t("phase1")}</span>
              <strong>{money(sim.monthlyIncomeUsd)}</strong>
              <small>{t("perMonth")}</small>
            </div>
            <div className="payment">
              <span>{t("phase2")}</span>
              <strong>
                {hasSecondPhase ? money(sim.phase2IncomeUsd) : "—"}
              </strong>
              <small>{hasSecondPhase ? t("perMonth") : t("noPhase2")}</small>
            </div>
          </div>
          <div className="calc-summary">
            <div>
              <span>{t("payback")}</span>
              <strong className={!isRecovered ? "caution" : ""}>
                {isRecovered
                  ? `${sim.payback} ${t("month")}`
                  : t("notRecovered")}
              </strong>
            </div>
            <div>
              <span>{t(sim.netGainUsd >= 0 ? "gain" : "shortfall")}</span>
              <strong className={sim.netGainUsd < 0 ? "caution" : ""}>
                {money(Math.abs(sim.netGainUsd))}
              </strong>
            </div>
          </div>
          <div className="chart-header">
            <span>{t("chartTitle")}</span>
            <span>0 — 48 {t("month")}</span>
          </div>
          <Chart
            sim={sim}
            money={money}
            label={t("chartLabel")}
            capital={t("capital")}
          />
          <div className="chart-axis">
            <span>{t("monthZero")}</span>
            <span>24 {t("month")}</span>
            <span>48 {t("month")}</span>
          </div>
          <p className="control-note chart-caption">{t("chartDesc")}</p>
          <div className="return-totals">
            <div>
              <span>{t("total")}</span>
              <strong>{money(sim.totalUsd)}</strong>
            </div>
            <div>
              <span>{t("roi")}</span>
              <strong>{pct(sim.roi)}</strong>
            </div>
            <div>
              <span>{t("irr")}</span>
              <strong>{sim.irr === null ? "—" : pct(sim.irr)}</strong>
            </div>
          </div>
          <p className="control-note">
            {t("gainNote")} {t("irrNote")}
          </p>
        </div>
      </div>
      <div className="calc-disclosures">
        <p>{t("note")}</p>
        <p>
          {t("limits")} <a href="#model">{t("source")} ↗</a>
        </p>
      </div>
      <details className="schedule">
        <summary>
          {t("schedule")}
          <span aria-hidden="true">+</span>
        </summary>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label={t("schedule")}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">{t("month")}</th>
                <th scope="col">{t("phase")}</th>
                <th scope="col">{t("payment")}</th>
                <th scope="col">{t("cumulative")}</th>
              </tr>
            </thead>
            <tbody>
              {sim.rows.map((row) => (
                <tr key={row.m}>
                  <th scope="row">{row.m}</th>
                  <td>{row.phase === 1 ? "70%" : "30%"}</td>
                  <td>{money(row.payUsd)}</td>
                  <td>{money(row.cumUsd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
