# Wolter Invest — investor landing (`invest.wolter.uz`)

Trilingual (🇺🇿 uz · 🇷🇺 ru · 🇬🇧 en) investor-acquisition site for **Wolter** — a
Tashkent battery-swap + e-bike network raising capital via an **Islom moliyasi (Ijarah)**
profit-share. Ported from the approved single-file prototype to a production Next.js app.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **next-intl** for i18n (locale-prefixed routes: `/uz`, `/ru`, `/en`; default `uz`)
- Custom CSS design system (no Tailwind) — `src/app/[locale]/globals.css`
- No backend: the lead form hands off to Telegram via a deep link

## Run

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /uz
```

Production:

```bash
npm run build
npm run start
```

## Structure

```
src/
  app/[locale]/
    layout.tsx        # html shell, fonts, NextIntlClientProvider, metadata
    page.tsx          # all sections (server component, i18n)
    globals.css       # full design system
  components/
    Nav.tsx           # client — sticky nav, language switch, mobile menu
    Calculator.tsx    # client — returns calculator + live SVG chart + scenario table
    LeadForm.tsx      # client — lead form → Telegram deep link
    CountUp.tsx       # client — count-up stats on scroll
    ScrollFX.tsx      # client — reveal-on-scroll
    Brand.tsx         # Wolter wordmark + spark mark (SVG)
  lib/model.ts        # verified financial model (single source of truth)
  messages/
    uz.json ru.json en.json   # all copy, full key parity
  i18n/
    routing.ts request.ts     # next-intl config
  middleware.ts               # locale routing
public/img/                   # product, team photos, company logos, hero
```

## Financial model

All return figures come from `src/lib/model.ts` (mirrors the Excel investor model).
CapEx prices: cabinet **$3,300**, e-bike **$410**, battery **$270**; FX **12,000 UZS/USD**.
1 cluster = **$14,710**; full round (30 clusters) = **$441,300**; split **70 / 30** over **48 months**.
Base (1 cluster): payback **14 mo**, IRR **75%**, 4-yr ROI **108%**.

## Compliance (do not soften)

Returns are **not guaranteed** (profit-share); the investment is **asset-backed, not equity**;
the structure follows **Islom moliyasi (Ijarah / Ijarah Muntahia Bittamleek)** principles
aligned with AAOIFI No. 9; illiquidity, FX and regulatory risks are disclosed; the footer
states this is not a public offering of securities.

## Deploy

Target: **invest.wolter.uz**. Works on any Node host or Vercel. The `middleware.ts`
handles locale routing; `/` redirects to the default locale.

## To finalize before launch

Founder to confirm/replace: canonical contact (@nabievuz / +998 99 432 03 18),
and any pending data-room items (securities-law opinion).
