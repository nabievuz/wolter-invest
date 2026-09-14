"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, routing } from "@/i18n/routing";
import { Wordmark } from "./Brand";

export default function Nav({ locale }: { locale: string }) {
  const t = useTranslations("site");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label="Wolter">
          <Wordmark />
          <span>INVEST</span>
        </a>
        <div
          className={"nav-links" + (open ? " open" : "")}
          id="navigation-links"
        >
          {[
            ["#how", "navHow"],
            ["#calc", "navCalc"],
            ["#evidence", "navEvidence"],
            ["#risks", "navRisks"],
          ].map(([href, key]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {t(key)}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <div className="lang" role="group" aria-label="Language">
            {routing.locales.map((lc) => (
              <button
                key={lc}
                aria-pressed={lc === locale}
                onClick={() => {
                  setOpen(false);
                  router.replace(pathname, { locale: lc });
                }}
              >
                {lc.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="btn btn-dark nav-cta" href="#cta">
            {t("navCta")}
            <span aria-hidden="true">↗</span>
          </a>
          <button
            className="burger"
            aria-label={t("menu")}
            aria-expanded={open}
            aria-controls="navigation-links"
            onClick={() => setOpen(!open)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
    </nav>
  );
}
