import { Fragment } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Nav from '@/components/Nav';
import Calculator from '@/components/Calculator';
import LeadForm from '@/components/LeadForm';
import CountUp from '@/components/CountUp';
import ScrollFX from '@/components/ScrollFX';
import { Spark } from '@/components/Brand';
import { simulate, usd } from '@/lib/model';

type Card = { title: string; text: string };
type IconCard = { icon: string; title: string; text: string; warn: boolean };

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();

  const ticker = t.raw('ticker') as string[];
  // Hero hook numbers — computed from the verified model so they can never drift.
  const sim = simulate(1, 'BASE');
  const heroCapex = usd(sim.capexUsd);
  const heroMonthly = '~$' + (Math.round(sim.monthlyIncomeUsd / 10) * 10).toLocaleString('en-US');
  const heroTotal = '~$' + (Math.round(sim.totalUsd / 100) * 100).toLocaleString('en-US');
  const heroMultiple = '×' + (sim.totalUsd / sim.capexUsd).toFixed(1);
  const flow = t.raw('hero.flow') as { value: string; label: string }[];
  const winYou = t.raw('hero.winwin.you') as string[];
  const winWolter = t.raw('hero.winwin.wolter') as string[];
  const flowIcons = [
    // invest (wallet)
    <svg key="f0" viewBox="0 0 24 24" fill="none"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17a1 1 0 0 1 1 1v1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="4" y="7.5" width="16.5" height="11.5" rx="2.5" stroke="currentColor" strokeWidth="2" /><circle cx="16.4" cy="13.3" r="1.4" fill="currentColor" /></svg>,
    // own (shield-check)
    <svg key="f1" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    // operate (swap arrows)
    <svg key="f2" viewBox="0 0 24 24" fill="none"><path d="M4 9h13l-3-3M20 15H7l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    // split (coins)
    <svg key="f3" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="7" ry="2.6" stroke="currentColor" strokeWidth="2" /><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" stroke="currentColor" strokeWidth="2" /><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" stroke="currentColor" strokeWidth="2" /></svg>
  ];
  const problemCards = t.raw('problem.cards') as Card[];
  const marketCards = t.raw('market.cards') as Card[];
  const products = t.raw('how.products') as { qty: string; name: string; desc: string }[];
  const howEq = t.raw('how.eq') as string[];
  const streams = t.raw('how.streams') as { tag: string; title: string; text: string }[];
  const cmpCols = t.raw('compare.cols') as string[];
  const cmpRows = t.raw('compare.rows') as { asset: string; invest: string; annual: string; payback: string; hot: boolean }[];
  const stats = t.raw('traction.stats') as { value: number; suffix: string; label: string }[];
  const steps = t.raw('structure.steps') as Card[];
  const zoneYou = t.raw('structure.zoneYou') as string[];
  const zoneWolter = t.raw('structure.zoneWolter') as string[];
  const ownCards = t.raw('ownership.cards') as Card[];
  const fundsCols = t.raw('funds.cols') as string[];
  const fundsRows = t.raw('funds.rows') as { asset: string; qty: string; value: string; share: string }[];
  const alloc = t.raw('funds.alloc') as { label: string; share: string }[];
  const reportRows = t.raw('report.rows') as { label: string; value: string; kind: string }[];
  const roadmap = t.raw('roadmap.items') as { when: string; title: string; text: string; hot: boolean }[];
  const riskCards = t.raw('risks.cards') as IconCard[];
  const sens = t.raw('risks.sens') as { k: string; mult: number }[];
  const faq = t.raw('faq.items') as { q: string; a: string }[];
  const members = t.raw('team.members') as { id: string; name: string; role: string; adv: boolean; desc: string; logosAlt: string }[];
  const ctaSteps = t.raw('cta.steps') as string[];
  const dataroom = t.raw('cta.dataroom') as string[];
  const dataroomSoon = t.raw('cta.dataroomSoon') as string[];
  const sensBase = sim.monthlyIncomeUsd;

  return (
    <>
      <Nav locale={locale} />
      <span id="top" />

      {/* HERO — hook: money in → asset → operation → money back, win-win */}
      <header className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="wrap hero-grid">
          {/* LEFT — number-led hook copy */}
          <div className="hero-copy reveal in">
            <span className="badge"><span className="dot" />{t('hero.badge')}</span>
            <h1 className="hero-title">
              <span>{t('hero.title1', { capex: heroCapex })}</span>
              <span>{t('hero.title2', { monthly: heroMonthly })}</span>
              <span className="g">{t('hero.title3', { payback: sim.payback })}</span>
            </h1>
            <p className="lead">{t('hero.lead')}</p>
            <div className="hook-flow" role="list">
              {flow.map((s, i) => (
                <Fragment key={i}>
                  <div className="hf-step" role="listitem">
                    <span className="hf-ic" aria-hidden="true">{flowIcons[i]}</span>
                    <div className="hf-t"><b>{s.value}</b><span>{s.label}</span></div>
                  </div>
                  {i < flow.length - 1 && (
                    <span className="hf-arr" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12h15m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  )}
                </Fragment>
              ))}
            </div>
            <div className="hero-cta">
              <a href="#calc" className="btn btn-primary">{t('hero.cta1')} <span aria-hidden="true">→</span></a>
              <a href="#cta" className="btn btn-ghost">{t('hero.cta2')}</a>
            </div>
            <p className="disc-mini">{t('hero.disclaimer')}</p>
          </div>

          {/* RIGHT — product stage with animated money flow */}
          <div className="hero-art reveal in">
            <div className="glow" />
            <div className="hero-stage">
              <div className="art-floor" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="art-cabinet" src="/img/swap-cabinet.webp" alt={t('hero.imgAltCabinet')} width={1122} height={1402} loading="eager" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="art-bike" src="/img/e-bike.webp" alt={t('hero.imgAltBike')} width={1448} height={1086} loading="eager" fetchPriority="high" />
            </div>
            <svg className="flow-svg" viewBox="0 0 600 600" aria-hidden="true">
              <path className="fl in" d="M100 130 C 150 220, 140 290, 190 375" />
              <path className="fl out" d="M405 415 C 470 375, 500 300, 518 225" />
            </svg>
            <div className="float-pill fp-in">
              <span className="fp-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17a1 1 0 0 1 1 1v1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="4" y="7.5" width="16.5" height="11.5" rx="2.5" stroke="currentColor" strokeWidth="2" /><circle cx="16.4" cy="13.3" r="1.4" fill="currentColor" /></svg></span>
              <div>
                <div className="fp-lab">{t('hero.pillInLabel')}</div>
                <div className="pn">{heroCapex}</div>
                <div className="fp-sub">{t('hero.pillInSub')}</div>
              </div>
            </div>
            <div className="float-pill fp-out">
              <span className="fp-ic mint" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="7" ry="2.6" stroke="currentColor" strokeWidth="2" /><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" stroke="currentColor" strokeWidth="2" /><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" stroke="currentColor" strokeWidth="2" /></svg></span>
              <div>
                <div className="fp-lab">{t('hero.pillOutLabel')}</div>
                <div className="pn mint">{heroMonthly}/{t('hero.pillOutUnit')}</div>
                <div className="fp-sub">{t('hero.pillOutSub')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* WIN-WIN band — both sides of the deal, stated openly */}
        <div className="wrap">
          <div className="winwin reveal in">
            <div className="ww-side">
              <h4>
                <span className="ww-hic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
                {t('hero.winwin.youTitle')}
              </h4>
              <ul>{winYou.map((w, i) => <li key={i}>{w}</li>)}</ul>
            </div>
            <div className="ww-mid">
              <span className="ww-hand" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M20.5 12A8.5 8.5 0 0 1 6 18.1M3.5 12A8.5 8.5 0 0 1 18 5.9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /><path d="M6.5 14.5 6 18.1l3.6.5M17.5 9.5 18 5.9l-3.6-.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <b>{t('hero.winwin.tag')}</b>
              <div className="ww-total">
                <span>{t('hero.winwin.totalLabel')}</span>
                <b>{heroTotal} · ~{heroMultiple}</b>
              </div>
            </div>
            <div className="ww-side alt">
              <h4>
                <span className="ww-hic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h6l-1 8 9-12h-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg></span>
                {t('hero.winwin.wolterTitle')}
              </h4>
              <ul>{winWolter.map((w, i) => <li key={i}>{w}</li>)}</ul>
            </div>
          </div>
          <p className="ww-caption reveal in">{t('hero.winwin.caption')}</p>
        </div>
      </header>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i}><b>{item}</b></span>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section id="problem">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">{t('problem.eyebrow')}</span>
            <h2 className="h-sec">{t('problem.title')}</h2>
            <p className="sub">{t('problem.subtitle')}</p>
          </div>
          <div className="grid cols-3" style={{ marginTop: 34 }}>
            {problemCards.map((c, i) => (
              <div className="card reveal" key={i}>
                <div className="kicker-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
          <div className="banner reveal">
            <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="currentColor" /></svg></div>
            <p>{t('problem.bannerPre')} <b style={{ color: 'var(--lime)' }}>{t('problem.bannerStrong')}</b> {t('problem.bannerPost')}</p>
          </div>
        </div>
      </section>

      {/* MARKET */}
      <section id="market" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">{t('market.eyebrow')}</span>
            <h2 className="h-sec">{t('market.title')}</h2>
          </div>
          <div className="grid cols-3" style={{ marginTop: 34 }}>
            {marketCards.map((c, i) => (
              <div className="card reveal" key={i}><h3>{c.title}</h3><p>{c.text}</p></div>
            ))}
          </div>
          <p className="note reveal">{t('market.note')}</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="wrap">
          <div className="reveal center" style={{ maxWidth: 760 }}>
            <span className="eyebrow" style={{ display: 'inline-flex' }}>{t('how.eyebrow')}</span>
            <h2 className="h-sec center">{t('how.title')}</h2>
            <p className="sub center">{t('how.subtitle')}</p>
          </div>
          <div className="prod-cards reveal">
            {products.map((p, i) => {
              const file = ['swap-cabinet', 'e-bike', 'battery'][i];
              return (
                <div className="prod-card" key={i}>
                  <div className="prod-qty">{p.qty}</div>
                  <div className={'prod-img' + (i === 2 ? ' batt' : '')}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/img/${file}.webp`} alt={p.name} loading="lazy" />
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="cluster-eq reveal">
            {howEq.map((part, i) => (
              <Fragment key={i}>
                <span>{part}</span>
                <i>{i < howEq.length - 1 ? '+' : '='}</i>
              </Fragment>
            ))}
            <b>{t('how.eqResult')}</b>
          </div>
          <div className="grid cols-2" style={{ marginTop: 22 }}>
            {streams.map((s) => (
              <div className="card reveal" key={s.tag}>
                <div className="rev-h"><span className="kicker-num">{s.tag}</span><h3 style={{ margin: 0 }}>{s.title}</h3></div>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="banner reveal" style={{ background: 'linear-gradient(100deg,rgba(55,224,160,.1),rgba(212,255,0,.05))' }}>
            <div className="ic" style={{ background: 'linear-gradient(135deg,#37E0A0,#A9D900)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5v14" stroke="#0A0C0B" strokeWidth="2.4" strokeLinecap="round" /></svg></div>
            <p>{t('how.ratioPre')} <b style={{ color: 'var(--mint)' }}>{t('how.ratioStrong')}</b> {t('how.ratioPost')}</p>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section id="compare" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">{t('compare.eyebrow')}</span>
            <h2 className="h-sec">{t('compare.title')}</h2>
            <p className="sub">{t('compare.subtitle')}</p>
          </div>
          <div className="reveal" style={{ marginTop: 30 }}>
            <table className="tbl">
              <thead><tr>{cmpCols.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
              <tbody>
                {cmpRows.map((r, i) => (
                  <tr key={i} className={r.hot ? 'hot' : ''}>
                    <td>{r.asset}</td>
                    <td className={r.invest === '—' ? 'mut' : 'tag-num'}>{r.invest}</td>
                    <td className={r.hot ? 'tag-num' : ''}>{r.annual}</td>
                    <td className={r.hot ? 'tag-num' : 'mut'}>{r.payback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="note">{t('compare.note')}</p>
          </div>
        </div>
      </section>

      {/* TRACTION */}
      <section id="traction">
        <div className="wrap">
          <div className="reveal center" style={{ maxWidth: 680 }}>
            <span className="eyebrow" style={{ display: 'inline-flex' }}>{t('traction.eyebrow')}</span>
            <h2 className="h-sec center">{t('traction.title')}</h2>
          </div>
          <div className="grid cols-4 stats-row reveal" style={{ marginTop: 38 }}>
            {stats.map((s, i) => (
              <div className="stat" key={i}><div className="sv"><CountUp end={s.value} />{s.suffix}</div><div className="sl">{s.label}</div></div>
            ))}
          </div>
          <p className="note center reveal" style={{ marginTop: 22 }}>{t('traction.source')}</p>
        </div>
      </section>

      {/* STRUCTURE */}
      <section id="structure" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">{t('structure.eyebrow')}</span>
            <h2 className="h-sec">{t('structure.title')}</h2>
          </div>
          <div className="grid cols-4 reveal" style={{ marginTop: 32 }}>
            {steps.map((s, i) => (
              <div className="card" key={i}><div className="kicker-num">{i + 1}</div><h3>{s.title}</h3><p>{s.text}</p></div>
            ))}
          </div>
          <div className="split-viz reveal">
            <div className="seg s1"><div className="seg-tag">{t('structure.phase1Tag')}</div><div className="seg-d">{t('structure.phase1')}</div></div>
            <div className="seg s2"><div className="seg-tag">{t('structure.phase2Tag')}</div><div className="seg-d">{t('structure.phase2')}</div></div>
            <div className="seg s3"><div className="seg-tag">{t('structure.iqtinoTag')}</div><div className="seg-d">{t('structure.iqtino')}</div></div>
          </div>
          <div className="grid cols-2 reveal" style={{ marginTop: 18 }}>
            <div className="zone"><h4>{t('structure.zoneYouTitle')}</h4><ul>{zoneYou.map((z, i) => <li key={i}>{z}</li>)}</ul></div>
            <div className="zone alt"><h4>{t('structure.zoneWolterTitle')}</h4><ul>{zoneWolter.map((z, i) => <li key={i}>{z}</li>)}</ul></div>
          </div>
          <div className="shariah reveal">
            <div className="sh-badge">{t('structure.islomBadge')}</div>
            <p>{t('structure.islomText')}</p>
          </div>
        </div>
      </section>

      {/* OWNERSHIP */}
      <section id="ownership" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">{t('ownership.eyebrow')}</span>
            <h2 className="h-sec">{t('ownership.title')}</h2>
          </div>
          <div className="grid cols-3 reveal" style={{ marginTop: 32 }}>
            {ownCards.map((c, i) => (
              <div className="card" key={i}><h3>{c.title}</h3><p>{c.text}</p></div>
            ))}
          </div>
          <p className="note reveal">{t('ownership.note')}</p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc">
        <div className="wrap">
          <div className="reveal center" style={{ maxWidth: 720 }}>
            <span className="eyebrow" style={{ display: 'inline-flex' }}>{t('calc.eyebrow')}</span>
            <h2 className="h-sec center">{t('calc.title')}</h2>
            <p className="sub center">{t('calc.subtitle')}</p>
          </div>
          <Calculator />
        </div>
      </section>

      {/* USE OF FUNDS */}
      <section id="funds" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">{t('funds.eyebrow')}</span>
            <h2 className="h-sec">{t('funds.title')}</h2>
            <p className="sub">{t('funds.subtitle')}</p>
          </div>
          <div className="grid cols-2 reveal" style={{ marginTop: 30, alignItems: 'start' }}>
            <table className="tbl">
              <thead><tr>{fundsCols.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
              <tbody>
                {fundsRows.map((r, i) => (
                  <tr key={i}><td>{r.asset}</td><td className="mut">{r.qty}</td><td className="tag-num">{r.value}</td><td>{r.share}</td></tr>
                ))}
                <tr className="hot"><td>{t('funds.totalLabel')}</td><td /><td className="tag-num">{t('funds.total')}</td><td>100%</td></tr>
              </tbody>
            </table>
            <div>
              <div className="alloc">
                <div className="alloc-bar">
                  <span style={{ width: alloc[0].share, background: 'var(--grad-lime)' }} />
                  <span style={{ width: alloc[1].share, background: 'linear-gradient(135deg,#37E0A0,#1FB87E)' }} />
                  <span style={{ width: alloc[2].share, background: 'rgba(255,255,255,.22)' }} />
                </div>
                <div className="alloc-keys">
                  <span><i style={{ background: 'var(--lime)' }} />{alloc[0].label} · {alloc[0].share}</span>
                  <span><i style={{ background: 'var(--mint)' }} />{alloc[1].label} · {alloc[1].share}</span>
                  <span><i style={{ background: 'rgba(255,255,255,.35)' }} />{alloc[2].label} · {alloc[2].share}</span>
                </div>
              </div>
              <p className="note">{t('funds.note')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MONTHLY REPORT */}
      <section id="report" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">{t('report.eyebrow')}</span>
            <h2 className="h-sec">{t('report.title')}</h2>
            <p className="sub">{t('report.subtitle')}</p>
          </div>
          <div className="stmt reveal">
            <div className="stmt-head"><span>{t('report.head')}</span><span className="stmt-tag">{t('report.tag')}</span></div>
            {reportRows.map((r, i) => (
              <div className={'stmt-row' + (r.kind === 'total' ? ' total' : r.kind === 'hl' ? ' hl' : '')} key={i}>
                <span>{r.label}</span>
                <b style={r.kind === 'warn' ? { color: 'var(--warn)' } : r.kind === 'hl' ? { color: 'var(--lime)' } : undefined}>{r.value}</b>
              </div>
            ))}
          </div>
          <p className="note reveal">{t('report.note')}</p>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">{t('roadmap.eyebrow')}</span>
            <h2 className="h-sec">{t('roadmap.title')}</h2>
          </div>
          <div className="road reveal">
            {roadmap.map((r, i) => (
              <div className={'road-item' + (r.hot ? ' hot' : '')} key={i}>
                <div className="road-when">{r.when}</div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISKS */}
      <section id="risks" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">{t('risks.eyebrow')}</span>
            <h2 className="h-sec">{t('risks.title')}</h2>
            <p className="sub">{t('risks.subtitle')}</p>
          </div>
          <div className="grid cols-4 reveal" style={{ marginTop: 30 }}>
            {riskCards.map((c, i) => (
              <div className={'risk-card' + (c.warn ? ' warn' : '')} key={i}>
                <div className="rk">{c.icon}</div><h3>{c.title}</h3><p>{c.text}</p>
              </div>
            ))}
          </div>
          <div className="sens reveal">
            <div className="sens-h">{t('risks.sensTitle')}</div>
            <div className="sens-row">
              {sens.map((s, i) => (
                <div className="sens-cell" key={i}><div className="sc-k">{s.k}</div><div className="sc-v">{usd(sensBase * s.mult)}</div></div>
              ))}
            </div>
            <p className="note" style={{ marginTop: 12 }}>{t('risks.sensNote')}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 820, margin: '0 auto' }}>
            <span className="eyebrow">{t('faq.eyebrow')}</span>
            <h2 className="h-sec">{t('faq.title')}</h2>
            <div className="faq reveal" style={{ marginTop: 26 }}>
              {faq.map((f, i) => (
                <details key={i} open={i === 0}>
                  <summary>{f.q}</summary>
                  <div className="faq-a">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">{t('team.eyebrow')}</span>
            <h2 className="h-sec">{t('team.title')}</h2>
          </div>
          <div className="team-grid reveal">
            {members.map((m) => (
              <div className="tcard" key={m.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="tphoto"><img src={`/img/team/${m.id}.png`} alt={m.name} loading="lazy" /></div>
                <h3>{m.name}</h3>
                <div className={'trole' + (m.adv ? ' adv' : '')}>{m.role}</div>
                <p>{m.desc}</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="tlogos"><img src={`/img/logos/${m.id}.png`} alt={m.logosAlt} loading="lazy" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="wrap">
          <div className="cta-grid">
            <div className="reveal">
              <span className="eyebrow">{t('cta.eyebrow')}</span>
              <h2 className="h-sec">{t('cta.title')}</h2>
              <p className="sub">{t('cta.subtitle')}</p>
              <div className="deal-steps">
                {ctaSteps.map((s, i) => (
                  <Fragment key={i}>
                    <span>{s}</span>
                    {i < ctaSteps.length - 1 && <i>→</i>}
                  </Fragment>
                ))}
              </div>
              <LeadForm />
            </div>
            <aside className="reveal">
              <div className="ask-card">
                <div className="ask-row"><div><div className="ask-l">{t('cta.askRoundLabel')}</div><div className="ask-v">{t('cta.askRoundVal')}</div></div><div className="ask-s">{t('cta.askRoundSub')}</div></div>
                <div className="ask-div" />
                <div className="ask-row"><div><div className="ask-l">{t('cta.askMinLabel')}</div><div className="ask-v" style={{ color: 'var(--lime)' }}>{t('cta.askMinVal')}</div></div><div className="ask-s">{t('cta.askMinSub')}</div></div>
              </div>
              <div className="dataroom">
                <div className="dr-h">{t('cta.dataroomTitle')}</div>
                <ul>
                  {dataroom.map((d, i) => (
                    <li key={i}><b>✓</b> {d}</li>
                  ))}
                  {dataroomSoon.map((d, i) => (
                    <li className="soon" key={`s${i}`}><b>◷</b> {d}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a className="brand" href="#top" style={{ marginBottom: 14 }}>
                <Spark />
                <span style={{ font: "700 18px 'Space Grotesk'", color: '#fff' }}>WOLTER</span>
              </a>
              <p style={{ maxWidth: '34ch' }}>{t('footer.about')}</p>
              <p style={{ marginTop: 10 }}>{t('footer.location')}</p>
            </div>
            <div>
              <h4>{t('footer.contactTitle')}</h4>
              <a href="https://t.me/nabievuz" target="_blank" rel="noopener">Telegram · @nabievuz</a>
              <a href="tel:+998994320318">+998 99 432 03 18</a>
              <a href="#cta">{t('footer.contactDocs')}</a>
            </div>
            <div>
              <h4>{t('footer.sectionsTitle')}</h4>
              <a href="#how">{t('footer.links.how')}</a>
              <a href="#structure">{t('footer.links.structure')}</a>
              <a href="#calc">{t('footer.links.calc')}</a>
              <a href="#risks">{t('footer.links.risks')}</a>
            </div>
          </div>
          <div className="legal">{t('footer.legal')}</div>
        </div>
      </footer>

      <ScrollFX />
    </>
  );
}
