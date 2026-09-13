# Wolter Invest

An Uzbek, Russian and English investor landing page for Wolter’s proposed asset-based e-bike and battery-swap offer. Built with Next.js 14, TypeScript and next-intl.

## Run and check

```sh
npm ci
npm run dev
npm run typecheck
npm test -- --runInBand
npm run build
```

Routes: `/uz`, `/ru`, `/en`. Use `localhost` for local previews so locale routing and the server hostname agree.

The project produces a standalone build. Copy `public` to `.next/standalone/public` and `.next/static` to `.next/standalone/.next/static`, then run:

```sh
HOSTNAME=localhost PORT=3000 node .next/standalone/server.js
```

For a deployment host, configure its required bind address and public hostname. Existing deployment configuration remains in place.

## Investor experience

The first screen shows the entry amount and both profit-sharing phases. Product cards explain what is funded. The calculator separates monthly distributions, capital recovery, total receipts and gains above capital. Its stress control includes zero profit and correctly shows when capital is not recovered within 48 months.

Company-reported pilot figures are dated and distinguished from model outputs. Assumptions, important terms and document requests are visible. Telegram prepares a message for the visitor to send; the site does not claim that the message has already been delivered.

## Model and evidence

`src/lib/model.ts` is the calculation source, not an independently audited business forecast. It retains the inputs supplied in the original repository: $14,710 per cluster (1 cabinet, 14 e-bikes, 21 batteries), an illustrative 12,000 UZS/USD rate, and a proposed 48-month 70%/30% distribution structure. The share changes in the month after cumulative distributions recover capital. Assets are proposed to transfer to Wolter at the end; treatment of unrecovered capital needs contractual confirmation.

The calculation normalizes swap data over 48 days and rental data over 18 days, holds profit constant, and scales clusters linearly. It omits additional replacement/repair costs, investor-specific taxes, payment delays and exchange-rate changes. The scenario multipliers have no assigned probabilities.

The pilot evidence and team roles are company-reported, not independent verification. References to Ijarah describe the proposed structure, not certification. Before publication, obtain current pilot records, financial reconciliations, contracts, title/asset records and legal/Sharia review as applicable. Confirm the existing Telegram and telephone contact details.

## Main files

- `src/app/[locale]/page.tsx`: translated sections and server-rendered model figures.
- `src/app/[locale]/globals.css`: responsive visual system and accessibility states.
- `src/components/Calculator.tsx`: scenarios, chart and 48-month schedule.
- `src/components/LeadForm.tsx`: validation and explicit Telegram handoff.
- `src/components/Nav.tsx`: navigation, language selection and mobile menu.
- `src/messages/{uz,ru,en}.json`: matching translation dictionaries.
- `__tests__/model.test.ts`: cash-flow, phase-transition and stress edge cases.

The redesign uses clear information hierarchy, concrete assets, progressive disclosure and reversible exploration. No neurological measurement or conversion uplift is claimed.

## Reported revenue, May–August 2026

`src/lib/revenue.ts` transcribes the table supplied by the owner on 13 September 2026. The owner confirmed that monetary amounts are UZS and E-bike rental is a count of rental events. `RevenueEvidence` computes totals and month-over-month changes directly from those inputs. The chart uses a zero baseline and includes the August decline. Exact figures and operation counts remain accessible in the table.

These reported revenue figures are separate from the older investment model. No net margin, updated asset base or subscription-only recurring revenue was supplied, so they are labeled monthly revenue and do not change projected investor distributions.

The owner corrected the pilot period to May 2026 and supplied an admin-panel screenshot showing 2,112 total users, 189 active and 1,923 inactive. These replace the earlier pilot statistics. Active/inactive are dashboard statuses with an unspecified activity window and definition. The financial model inputs are unchanged.

## Brand voice

Public copy speaks as Wolter: we run the network, our results show the business, and you are the prospective partner. Use direct, concise first-person language in all three locales. Explain assumptions and contract limits in the same company voice. Keep financial figures, source qualifications and guarantees accurate; do not add unsupported promises or describe the site as an external reviewer. Visitor consent and the prepared Telegram message retain the visitor’s own voice.
