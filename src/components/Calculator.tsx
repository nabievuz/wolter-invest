'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  simulate,
  SCENARIOS,
  MODEL,
  usd,
  pct,
  type Scenario,
  type SimResult
} from '@/lib/model';

const PRESETS = [1, 5, 15, 30];

function Chart({ sim, marker }: { sim: SimResult; marker: (m: number) => string }) {
  const W = 720,
    H = 250,
    padL = 8,
    padR = 8,
    padT = 14,
    padB = 14;
  const rows = sim.rows;
  const ymax = Math.max(sim.totalUsd, sim.capexUsd) * 1.06;
  const X = (m: number) => padL + ((m - 1) / (MODEL.term - 1)) * (W - padL - padR);
  const Y = (v: number) => H - padB - (v / ymax) * (H - padT - padB);
  const pb = sim.payback;
  const y0 = Y(0);
  const yCap = Y(sim.capexUsd);
  const p1 = rows.filter((r) => r.m <= pb).map((r) => `${X(r.m)},${Y(r.cumUsd)}`);
  const p2 = rows.filter((r) => r.m >= pb).map((r) => `${X(r.m)},${Y(r.cumUsd)}`);
  const area1 = `M${X(1)},${y0} L${p1.join(' L')} L${X(pb)},${y0} Z`;
  const area2 = p2.length > 1 ? `M${X(pb)},${y0} L${p2.join(' L')} L${X(MODEL.term)},${y0} Z` : '';
  const line1 = `M${p1.join(' L')}`;
  const line2 = p2.length > 1 ? `M${p2.join(' L')}` : '';
  const xPb = X(pb);

  return (
    <svg id="chart" viewBox="0 0 720 250" preserveAspectRatio="none" aria-label="Cumulative return chart">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C6F23D" stopOpacity=".42" />
          <stop offset="1" stopColor="#C6F23D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#37E0A0" stopOpacity=".34" />
          <stop offset="1" stopColor="#37E0A0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1={padL} y1={yCap} x2={W - padR} y2={yCap} stroke="rgba(255,255,255,.28)" strokeWidth="1" strokeDasharray="4 5" />
      <text x={W - padR} y={yCap - 6} fill="rgba(255,255,255,.55)" fontSize="11" textAnchor="end" fontFamily="Inter">
        CapEx {usd(sim.capexUsd)}
      </text>
      {area2 && <path d={area2} fill="url(#g2)" />}
      <path d={area1} fill="url(#g1)" />
      {line2 && <path d={line2} fill="none" stroke="#37E0A0" strokeWidth="2.4" strokeLinejoin="round" />}
      <path d={line1} fill="none" stroke="#C6F23D" strokeWidth="2.6" strokeLinejoin="round" />
      <line x1={xPb} y1={padT} x2={xPb} y2={H - padB} stroke="#F4B560" strokeWidth="1.6" strokeDasharray="3 4" />
      <circle cx={xPb} cy={Y(rows[pb - 1].cumUsd)} r="4.5" fill="#F4B560" />
      <text x={xPb + (pb > 40 ? -6 : 6)} y={padT + 12} fill="#F4B560" fontSize="11.5" fontFamily="Inter" textAnchor={pb > 40 ? 'end' : 'start'}>
        {marker(pb)}
      </text>
    </svg>
  );
}

export default function Calculator() {
  const t = useTranslations('calc');
  const [clusters, setClusters] = useState(1);
  const [scenario, setScenario] = useState<Scenario>('BASE');

  const sim = simulate(clusters, scenario);
  const mo = t('monthUnit');
  const fill = ((clusters - 1) / (MODEL.maxClusters - 1)) * 100;
  const chartX = t.raw('chartX') as string[];
  const tableCols = t.raw('tableCols') as string[];
  const fxSteps = t.raw('fxSteps') as string[];

  return (
    <div className="calc-panel reveal">
      <div className="calc-grid">
        {/* CONTROLS */}
        <div className="calc-controls">
          <div className="ctrl">
            <label>{t('clustersLabel')}</label>
            <div className="readout">
              <span id="cl-count">{clusters}</span>
              <span className="ro-unit">{t('clustersUnit')}</span>
            </div>
            <input
              type="range"
              min={1}
              max={MODEL.maxClusters}
              step={1}
              value={clusters}
              aria-label={t('clustersLabel')}
              className="range"
              style={{
                background: `linear-gradient(90deg,var(--lime) ${fill}%,rgba(255,255,255,.1) ${fill}%)`
              }}
              onChange={(e) => setClusters(Number(e.target.value))}
            />
            <div className="presets">
              {PRESETS.map((c) => (
                <button
                  key={c}
                  className={'preset' + (c === clusters ? ' on' : '')}
                  onClick={() => setClusters(c)}
                >
                  {c === MODEL.maxClusters ? `${c} · ${t('presetFull')}` : c}
                </button>
              ))}
            </div>
          </div>
          <div className="ctrl">
            <label>{t('scenarioLabel')}</label>
            <div className="scns">
              {SCENARIOS.map((s) => (
                <button
                  key={s}
                  className={'scn' + (s === scenario ? ' on' : '')}
                  onClick={() => setScenario(s)}
                >
                  <b>{t(`scenarios.${s}.name`)}</b>
                  <i>{t(`scenarios.${s}.hint`)}</i>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* OUTPUTS */}
        <div className="calc-out">
          <div className="outs">
            <div className="out">
              <div className="ol">{t('out.capex')}</div>
              <div className="ov">{usd(sim.capexUsd)}</div>
            </div>
            <div className="out hot">
              <div className="ol">{t('out.payback')}</div>
              <div className="ov">{sim.payback} {mo}</div>
            </div>
            <div className="out">
              <div className="ol">{t('out.monthly')}</div>
              <div className="ov">{usd(sim.monthlyIncomeUsd)}</div>
            </div>
            <div className="out">
              <div className="ol">{t('out.roi')}</div>
              <div className="ov">{pct(sim.roi)}</div>
            </div>
            <div className="out">
              <div className="ol">{t('out.irr')}</div>
              <div className="ov">{sim.irr === null ? '—' : pct(sim.irr)}</div>
            </div>
            <div className="out">
              <div className="ol">{t('out.total')}</div>
              <div className="ov">{usd(sim.totalUsd)}</div>
            </div>
          </div>
          <div className="chart-wrap">
            <div className="legend">
              <span><i className="lg1" />{t('legend.p1')}</span>
              <span><i className="lg2" />{t('legend.p2')}</span>
              <span><i className="lg3" />{t('legend.payback')}</span>
            </div>
            <Chart sim={sim} marker={(m) => t('paybackMarker', { m })} />
            <div className="chart-x">
              {chartX.map((x, i) => (
                <span key={i}>{x}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <table className="tbl scn-tbl" style={{ marginTop: 22 }}>
        <thead>
          <tr>
            {tableCols.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SCENARIOS.map((s) => {
            const r = simulate(clusters, s);
            return (
              <tr key={s} className={s === scenario ? 'live' : ''}>
                <td>{t(`scenarios.${s}.name`)}</td>
                <td>{r.payback} {mo}</td>
                <td>{usd(r.monthlyIncomeUsd)}</td>
                <td>{usd(r.totalUsd)}</td>
                <td>{pct(r.roi)}</td>
                <td>{r.irr === null ? '—' : pct(r.irr)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="calc-foot">
        <div className="fx-steps">
          <span>{fxSteps[0]}</span>
          <span>→</span>
          <span>{fxSteps[1]}</span>
          <span>→</span>
          <span>{fxSteps[2]}</span>
        </div>
        <p className="note" style={{ marginTop: 0 }}>
          {t('note')} <b style={{ color: 'var(--warn)' }}>{t('noteWarn')}</b>
        </p>
      </div>
    </div>
  );
}
