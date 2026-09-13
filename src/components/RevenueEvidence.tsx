import { useTranslations } from "next-intl";
import { REVENUE } from "@/lib/revenue";

export default function RevenueEvidence({ locale }: { locale: string }) {
  const t = useTranslations("revenue");
  const formatLocale = ["uz", "ru", "en"].includes(locale) ? locale : "uz";
  const number = (n: number) => new Intl.NumberFormat(formatLocale).format(n);
  const decimal = (n: number) =>
    new Intl.NumberFormat(formatLocale, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }).format(n);
  const percent = (n: number) => `${n > 0 ? "+" : ""}${decimal(n)}%`;
  const latest = REVENUE[3];
  const growth = (latest.total / REVENUE[0].total - 1) * 100;
  const monthlyChange = (latest.total / REVENUE[2].total - 1) * 100;
  const total = REVENUE.reduce((sum, row) => sum + row.total, 0);
  const scale = 450000000;

  return (
    <article className="revenue-evidence" aria-labelledby="revenue-title">
      <div className="revenue-heading">
        <div>
          <p className="eyebrow">{t("label")}</p>
          <h3 id="revenue-title">{t("title")}</h3>
        </div>
        <span className="revenue-period">{t("period")}</span>
      </div>
      <div className="revenue-metrics">
        <div>
          <span>{t("latest")}</span>
          <strong>
            {decimal(latest.total / 1e6)} <small>{t("million")}</small>
          </strong>
          <p>UZS · {t("august")} 2026</p>
        </div>
        <div>
          <span>{t("sinceMay")}</span>
          <strong>{percent(growth)}</strong>
          <p>{t("growthNote")}</p>
        </div>
        <div>
          <span>{t("monthlyChange")}</span>
          <strong className="revenue-decline">{percent(monthlyChange)}</strong>
          <p>{t("changeNote")}</p>
        </div>
      </div>
      <figure className="revenue-chart">
        <figcaption>
          {t("chartTitle")} <span>· {t("million")} UZS</span>
        </figcaption>
        <div className="revenue-legend">
          <span>
            <i className="revenue-bike-key" />
            {t("bikeRevenue")}
          </span>
          <span>
            <i className="revenue-swap-key" />
            {t("swapRevenue")}
          </span>
        </div>
        <div
          className="revenue-plot"
          role="img"
          aria-label={t("chartDescription")}
        >
          <div className="revenue-axis" aria-hidden="true">
            <span>450</span>
            <span>300</span>
            <span>150</span>
            <span>0</span>
          </div>
          <div className="revenue-bars" aria-hidden="true">
            {REVENUE.map((row) => (
              <div className="revenue-column" key={row.month}>
                <div
                  className="revenue-stack"
                  style={{ height: `${(row.total / scale) * 100}%` }}
                >
                  <strong>{decimal(row.total / 1e6)}</strong>
                  <div
                    className="revenue-swap"
                    style={{ flexGrow: row.swapRevenue }}
                  />
                  <div
                    className="revenue-bike"
                    style={{ flexGrow: row.bikeRevenue }}
                  />
                </div>
                <span className="revenue-month">{t(row.month)}</span>
              </div>
            ))}
          </div>
        </div>
      </figure>
      <p className="revenue-total">
        {t("total")} <strong>{number(total)} UZS</strong>
      </p>
      <details className="revenue-details">
        <summary>
          {t("tableTitle")}
          <span className="details-icon" aria-hidden="true">
            +
          </span>
        </summary>
        <div
          className="revenue-table-scroll"
          tabIndex={0}
          role="region"
          aria-label={t("tableTitle")}
        >
          <table>
            <caption>{t("tableCaption")}</caption>
            <thead>
              <tr>
                <th scope="col">{t("month")}</th>
                <th scope="col">{t("rentals")}</th>
                <th scope="col">{t("swaps")}</th>
                <th scope="col">{t("bikeRevenue")}, UZS</th>
                <th scope="col">{t("swapRevenue")}, UZS</th>
                <th scope="col">{t("totalShort")}, UZS</th>
                <th scope="col">{t("mom")}</th>
              </tr>
            </thead>
            <tbody>
              {REVENUE.map((row, i) => (
                <tr key={row.month}>
                  <th scope="row">{t(row.month)}</th>
                  <td>{number(row.rentals)}</td>
                  <td>{number(row.swaps)}</td>
                  <td>{number(row.bikeRevenue)}</td>
                  <td>{number(row.swapRevenue)}</td>
                  <td>
                    <strong>{number(row.total)}</strong>
                  </td>
                  <td>
                    {i === 0
                      ? "—"
                      : percent((row.total / REVENUE[i - 1].total - 1) * 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <p className="revenue-source">{t("source")}</p>
      <p className="revenue-source">{t("limits")}</p>
    </article>
  );
}
