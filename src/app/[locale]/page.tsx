import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Nav from "@/components/Nav";
import Calculator from "@/components/Calculator";
import LeadForm from "@/components/LeadForm";
import RevenueEvidence from "@/components/RevenueEvidence";
import { Wordmark } from "@/components/Brand";
import { CLUSTER_CAPEX, MODEL, simulate, usd } from "@/lib/model";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("site");
  const team = useTranslations("team");
  const calc = useTranslations("calc");
  const sim = simulate(1, "BASE");
  // Capital raised under this structure, confirmed by the owner on 2026-09-13.
  const capitalRaisedUsd = 250000;
  const products = [
    {
      name: "cabinet",
      count: 1,
      price: MODEL.cabinetPrice,
      file: "swap-cabinet",
      w: 1122,
      h: 1402,
    },
    {
      name: "bike",
      count: MODEL.bikesPerCluster,
      price: MODEL.bikePrice,
      file: "e-bike",
      w: 1448,
      h: 1086,
    },
    {
      name: "battery",
      count: MODEL.batteriesPerCluster,
      price: MODEL.batteryPrice,
      file: "battery",
      w: 700,
      h: 700,
    },
  ];
  const members = team.raw("members") as {
    id: string;
    name: string;
    role: string;
    desc: string;
  }[];

  return (
    <>
      <a className="skip-link" href="#main">
        {t("skip")}
      </a>
      <Nav locale={locale} />
      <main id="main">
        <section className="hero" id="top">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" />
                {t("heroTag")}
              </p>
              <h1>
                {t("heroTitle1")}
                <br />
                <span>{t("heroTitle2")}</span>
              </h1>
              <p className="hero-desc">{t("heroDesc")}</p>
              <div className="entry">
                <span>{t("entry")}</span>
                <strong>
                  {usd(CLUSTER_CAPEX)}
                  <span> ↗</span>
                </strong>
                <small>{t("entryNote")}</small>
              </div>
              <div className="hero-actions">
                <a className="btn btn-dark" href="#calc">
                  {t("heroCta")}
                  <Arrow />
                </a>
                <a className="text-link" href="#how">
                  {t("heroSecondary")}
                  <Arrow diagonal />
                </a>
              </div>
              <p className="hero-disclosure">{t("heroDisclosure")}</p>
            </div>
            <div className="hero-visual">
              <div className="asset-stage">
                <div className="stage-heading">
                  <span>{t("assetTag")}</span>
                  <span>1 + 14 + 21</span>
                </div>
                <div className="stage-orbit" aria-hidden="true" />
                <span className="stage-word" aria-hidden="true">
                  W
                </span>
                {/* Existing product photography from the repository. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/hero.webp"
                  alt={`${t("cabinet")} + ${t("bike")}`}
                  width="1672"
                  height="941"
                  className="hero-product"
                  fetchPriority="high"
                />
                <div className="asset-caption">
                  <span className="tiny-cross" aria-hidden="true">
                    +
                  </span>
                  {t("assetCaption")}
                  <span aria-hidden="true">↗</span>
                </div>
              </div>
              <div className="reward-card">
                <div className="reward-top">
                  <span className="eyebrow">{t("projection")}</span>
                  <span className="reward-icon" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div className="reward-value">
                  ~{usd(sim.monthlyIncomeUsd)}
                  <span>{t("monthly")}</span>
                </div>
                <p className="reward-share">{t("firstPhase")}</p>
                <div className="reward-next">
                  <span>{t("secondPhase")}</span>
                  <strong>
                    ~{usd(sim.phase2IncomeUsd)}{" "}
                    <small>{calc("perMonth")}</small>
                  </strong>
                </div>
                <p className="reward-note">{t("rewardNote")}</p>
              </div>
            </div>
          </div>
          <div className="wrap benefits">
            {[1, 2, 3].map((n) => (
              <div className="benefit" key={n}>
                <span className="benefit-mark" aria-hidden="true">
                  {n === 1 ? "□" : n === 2 ? "↗" : "↔"}
                </span>
                <div>
                  <h3>{t(`benefit${n}Title`)}</h3>
                  <p>{t(`benefit${n}Text`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="section assets-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t("howEyebrow")}</p>
                <h2>{t("howTitle")}</h2>
              </div>
              <p>{t("howDesc")}</p>
            </div>
            <div className="product-grid">
              {products.map((p, i) => (
                <article className={"product product-" + p.name} key={p.name}>
                  <div className="product-top">
                    <span>0{i + 1}</span>
                    <span className="quantity">× {p.count}</span>
                  </div>
                  <div className="product-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/img/${p.file}.webp`}
                      alt={t(p.name)}
                      width={p.w}
                      height={p.h}
                      loading="lazy"
                    />
                  </div>
                  <div className="product-copy">
                    <h3>{t(p.name)}</h3>
                    <p>{t(`${p.name}Desc`)}</p>
                    <div className="product-price">
                      <span>
                        {p.count} × {usd(p.price)}
                      </span>
                      <strong>{usd(p.count * p.price)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="streams">
              {[1, 2].map((n) => (
                <article key={n}>
                  <span className="stream-arrow" aria-hidden="true">
                    ↗
                  </span>
                  <div>
                    <h3>{t(`stream${n}`)}</h3>
                    <p>{t(`stream${n}Text`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="calc" className="section calculator-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{calc("eyebrow")}</p>
                <h2>{calc("title")}</h2>
              </div>
              <p>{calc("desc")}</p>
            </div>
            <Calculator />
          </div>
        </section>

        <section id="structure" className="section structure-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t("flowEyebrow")}</p>
                <h2>{t("flowTitle")}</h2>
              </div>
              <p>{t("flowDesc")}</p>
            </div>
            <div className="phase-grid">
              {[1, 2].map((n) => (
                <article className={"phase-card phase-" + n} key={n}>
                  <div className="phase-top">
                    <span>0{n}</span>
                    <Arrow />
                  </div>
                  <strong className="phase-percent">
                    {n === 1 ? "70" : "30"}
                    <span>%</span>
                  </strong>
                  <h3>{t(`phase${n}Title`)}</h3>
                  <p>{t(`phase${n}Text`)}</p>
                </article>
              ))}
              <article className="phase-end">
                <span className="eyebrow">{t("phaseEnd")}</span>
                <div className="end-symbol" aria-hidden="true">
                  48<span>↗</span>
                </div>
                <p>{t("phaseEndText")}</p>
              </article>
            </div>
            <p className="section-note">{t("sharedNote")}</p>
          </div>
        </section>

        <section id="evidence" className="section evidence-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t("evidenceEyebrow")}</p>
                <h2>{t("evidenceTitle")}</h2>
              </div>
              <p>{t("evidenceDesc")}</p>
            </div>
            <RevenueEvidence locale={locale} />
            <details className="historical-pilot">
              <summary>
                {t("pilotLabel")}
                <span className="details-icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pilot-label">
                <span className="status-dot" />
                {t("pilotLabel")}
              </p>
              <div className="pilot-stats">
                {[
                  ["2 112", "users"],
                  ["189", "activeUsers"],
                  ["1 923", "inactiveUsers"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{t(label)}</span>
                  </div>
                ))}
              </div>
              <p className="section-note">{t("pilotNote")}</p>
            </details>
            <details className="model-source" id="model">
              <summary>
                <span>{t("modelTitle")}</span>
                <span className="details-icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="source-content">
                <p>{t("modelDesc")}</p>
                <dl>
                  <div>
                    <dt>{t("modelSwap")}</dt>
                    <dd>252 468 870 UZS</dd>
                  </div>
                  <div>
                    <dt>{t("modelRental")}</dt>
                    <dd>134 677 000 UZS</dd>
                  </div>
                  <div>
                    <dt>{t("modelCost")}</dt>
                    <dd>{t("modelCostValue")}</dd>
                  </div>
                </dl>
                <p>{t("modelExplain")}</p>
                <p>{t("modelLimits")}</p>
                <a
                  className="text-link"
                  href="https://github.com/nabievuz/wolter-invest/blob/2f221ca/src/lib/model.ts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("sourceLink")}
                </a>
              </div>
            </details>
          </div>
        </section>

        <section id="risks" className="section risks-section">
          <div className="wrap risk-grid">
            <div className="risk-intro">
              <p className="eyebrow">{t("risksEyebrow")}</p>
              <h2>{t("risksTitle")}</h2>
              <p>{t("risksDesc")}</p>
              <div className="partnership-proof">
                <span>{t("raisedLabel")}</span>
                <strong>{usd(capitalRaisedUsd)}</strong>
                <p>{t("raisedText")}</p>
                <small>{t("raisedDate")}</small>
              </div>
              <a className="text-link" href="#cta">
                {t("termsCta")}
                <Arrow />
              </a>
            </div>
            <div className="risk-list">
              {[4, 3, 1, 2].map((n, index) => (
                <details key={n} open={n === 4 || n === 3}>
                  <summary>
                    <span className="risk-number">0{index + 1}</span>
                    <span>{t(`risk${n}Title`)}</span>
                    <span className="details-icon" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="risk-body">
                    <p>{t(`risk${n}Text`)}</p>
                    {n === 3 && (
                      <p className="equipment-care-note">{t("risk3Care")}</p>
                    )}
                    {n === 4 && (
                      <a className="text-link" href="#cta">
                        {t("legalCta")}
                      </a>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="section team-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t("teamEyebrow")}</p>
                <h2>{t("teamTitle")}</h2>
              </div>
            </div>
            <div className="team-grid">
              {members.map((m) => (
                <article className="person" key={m.id}>
                  <div className="person-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/img/team/${m.id}.png`}
                      alt={m.name}
                      width="480"
                      height="480"
                      loading="lazy"
                    />
                  </div>
                  <h3>{m.name}</h3>
                  <span className="person-role">{m.role}</span>
                </article>
              ))}
            </div>
            <p className="section-note">{t("teamNote")}</p>
          </div>
        </section>

        <section id="cta" className="section cta-section">
          <div className="wrap cta-grid">
            <div className="cta-copy">
              <p className="eyebrow">{t("ctaEyebrow")}</p>
              <h2>{t("ctaTitle")}</h2>
              <p>{t("ctaDesc")}</p>
              <ul className="document-list">
                {[1, 2, 3].map((n) => (
                  <li key={n}>
                    <span aria-hidden="true">↗</span>
                    {t(`doc${n}`)}
                  </li>
                ))}
              </ul>
              <p className="doc-note">{t("docNote")}</p>
            </div>
            <div className="form-card">
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="wrap">
          <div className="footer-top">
            <a href="#top" className="brand" aria-label="Wolter">
              <Wordmark />
            </a>
            <p>{t("footerAbout")}</p>
            <a
              className="footer-contact"
              href="https://t.me/nabievuz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram ↗
            </a>
          </div>
          <div className="footer-bottom">
            <p>{t("footerLegal")}</p>
            <span>© 2026 WOLTER</span>
          </div>
        </div>
      </footer>
    </>
  );
}
