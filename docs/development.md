# Ishga tushirish va rivojlantirish

[README’ga qaytish](../README.md)

## Muhit

Docker konfiguratsiyasi Node.js 22 dan foydalanadi; mahalliy ish uchun ham shu versiyani ishlating. Bog‘liqliklarni `npm ci` bilan lockfile asosida o‘rnating. Hozirgi sayt tashqi API kalitlari yoki `.env` sozlamalariga bog‘liq emas.

```sh
npm ci
npm run dev -- --hostname localhost --port 3210
```

Manzillar: `/uz`, `/ru`, `/en`. Mahalliy tekshiruvda server hostname va brauzer manzilini `localhost` qilib saqlang.

## Production yig‘masi

Avval shu loyiha uchun ishlayotgan serverni to‘xtating. Ishlayotgan standalone server fayllari ustidan qayta build qilish vaqtincha sahifa xatolariga olib kelishi mumkin.

```sh
npm run build
mkdir -p .next/standalone/public .next/standalone/.next/static
cp -R public/. .next/standalone/public/
cp -R .next/static/. .next/standalone/.next/static/
HOSTNAME=localhost PORT=3210 node .next/standalone/server.js
```

`output: 'standalone'` sozlamasi `next.config.mjs` ichida. Build’dan so‘ng `public` va `.next/static` fayllari yuqoridagidek ko‘chirilishi kerak. `/api/health` server holati, paket versiyasi va vaqt belgisini qaytaradi; bu tashqi xizmatlar tekshiruvi emas.

## Docker

```sh
docker build -t wolter-invest .
docker run --rm -p 3210:3000 wolter-invest
```

Dockerfile bog‘liqliklarni o‘rnatish, build va ishga tushirish bosqichlaridan iborat. Konteyner `0.0.0.0:3000` manzilida, root bo‘lmagan foydalanuvchi bilan ishlaydi. Domen va HTTPS hosting muhitida sozlanadi.

## Loyiha tuzilmasi

| Fayl yoki papka | Vazifasi |
| --- | --- |
| `src/app/[locale]/page.tsx` | Sayt bo‘limlari va serverda hisoblanadigan ko‘rsatkichlar |
| `src/app/[locale]/globals.css` | Moslashuvchan dizayn, tipografiya va holatlar |
| `src/components/Calculator.tsx` | Kalkulyator, ssenariylar va oylik jadval |
| `src/components/RevenueEvidence.tsx` | Tushum grafigi va aniq raqamlar |
| `src/components/LeadForm.tsx` | Forma tekshiruvi va Telegram xabari |
| `src/components/Nav.tsx` | Navigatsiya va til tanlash |
| `src/lib/model.ts` | Investitsiya modelining parametrlari va hisoblari |
| `src/lib/revenue.ts` | Kompaniya taqdim etgan tushum va operatsiya ma’lumotlari |
| `src/messages/` | O‘zbekcha, ruscha va inglizcha matnlar |
| `public/img/team/` | Jamoaning 512×512 shaffof PNG portretlari |
| `__tests__/model.test.ts` | Pul oqimi, ulush almashishi va stress holatlari testlari |

## Matn va dizaynni yangilash

- Wolter nomidan gapiring: **biz**, **jamoamiz**, **natijalarimiz**. Investorga **siz** deb murojaat qiling.
- Yangi matn kalitlarini uchala tilga kiriting. Rozilik va tayyor Telegram xabari tashrifchi nomidan yoziladi.
- Moliyaviy raqamni o‘zgartirganda davri, valyutasi, manbasi va hisobga ta’sirini ham tekshiring. Tushum ma’lumotlarini investorning sof foydasiga avtomatik almashtirmang.
- Suratlarni kvadrat va shaffof PNG shaklida saqlang. Mavjud `object-fit: contain` va 1:1 nisbat portretlarni kesmasdan ko‘rsatadi.
- Kompaniya bergan faktlarni saqlang; tekshirilmagan kafolat, sertifikat yoki konversiya o‘sishi haqidagi da’volarni qo‘shmang.

Forma ma’lumotlarini sayt serveri saqlamaydi. U Telegram’da tayyor xabarni ochadi; uni yuborish tashrifchining keyingi amali hisoblanadi. Aloqa ma’lumotlari o‘zgarsa, forma, tarjimalar va sayt footerini birga tekshiring.

## Tekshirish

```sh
npm run lint
npm run typecheck
npm test -- --runInBand
npm run build
```

UI o‘zgarsa desktop va mobil ko‘rinishlarni ko‘ring. Tarjima o‘zgarsa uchala tilni tekshiring. Hisoblash mantig‘i o‘zgarsa kapital qoplanmasligi, nol foyda va 70% dan 30% ga o‘tish holatlarini test qiling.
