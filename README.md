# Wolter Invest

**Siz — aktiv egasi. Biz — operator.**

Biz kuryerlarni elektr velosiped va quvvat bilan ta’minlaymiz. Wolter Invest saytida jihozlarni moliyalashtirish, foydadan oylik ulush olish va biz bilan hamkorlik qilish shartlarini tushuntiramiz.

[Sayt](https://invest.wolter.uz/) · [Ishga tushirish va rivojlantirish](docs/development.md) · [Ma’lumotlar va hisoblash modeli](docs/model-and-data.md)

## Saytda nimalar bor?

- **Hamkorlik taklifi:** bitta klaster tarkibi, jihozlar narxi va vazifasi.
- **Interaktiv kalkulyator:** klasterlar soni, foyda ssenariylari, UZS va USD ekvivalenti, 48 oylik pul oqimi va kapital qoplanishi.
- **Natijalarimiz:** 2026-yil may–avgust tushumlari, ijara va SWAP operatsiyalari, may oyidagi pilot ko‘rsatkichlari.
- **Muhim shartlar:** egalik, operator mas’uliyati, ijara tuzilmasi va hujjatlar bilan tanishish.
- **Jamoamiz:** asosiy qarorlarni qabul qiluvchi a’zolarimiz va 25 kishilik operatsion jamoamiz haqida ma’lumot.
- **Bog‘lanish:** tashrifchi tekshirib, o‘zi yuborishi uchun Telegram xabarini tayyorlaydigan forma.

Sayt o‘zbekcha, ruscha va inglizcha ishlaydi: `/uz`, `/ru`, `/en`. Dizayn telefon, planshet va desktop ekranlariga moslangan. Jamoa portretlari shaffof fonli 512×512 PNG formatida, kesilmasdan ko‘rsatiladi.

## Tez ishga tushirish

Node.js 22 va npm bilan:

```sh
git clone https://github.com/nabievuz/wolter-invest.git
cd wolter-invest
npm ci
npm run dev -- --hostname localhost --port 3210
```

Brauzerda [localhost:3210/uz](http://localhost:3210/uz) sahifasini oching. Mahalliy manzil uchun `localhost` ishlating. Hozirgi saytni ishga tushirish uchun maxfiy kalitlar yoki `.env` fayli talab qilinmaydi.

## Bizning ma’lumotlarga yondashuvimiz

Amaldagi tushumlarimiz va investor kalkulyatoridagi taxminiy natijalarni alohida ko‘rsatamiz. Pul summalari, davrlar va hisob farazlarini ochiq yozamiz. Tushumni sof foyda yoki kafolatlangan investor to‘lovi sifatida talqin qilmaymiz.

2026-yil 13-sentabr holatiga shu ijara tuzilmasi asosida **$250,000 investitsiya jalb qilganmiz**. Ijara tuzilmasi va yuridik xulosamiz tayyor; egalik va operator majburiyatlari shartnomada belgilangan. Bu kompaniyamiz taqdim etgan ma’lumotlar bo‘lib, repo mustaqil audit yoki yuridik xulosa o‘rnini bosmaydi.

Kalkulyatorimiz 48 oylik modelga asoslanadi. Foyda, kapitalning qaytishi va texnik uzilishlarsiz ishlash kafolatlanmaydi. Raqamlarning manbasi, formulalar va cheklovlar [model hujjatida](docs/model-and-data.md) berilgan.

## Texnologiyalar va tekshiruvlar

Next.js 14 · React 18 · TypeScript · next-intl · Jest · Docker standalone

```sh
npm run lint
npm run typecheck
npm test -- --runInBand
npm run build
```

Production server, Docker, loyiha tuzilmasi va matnlarni yangilash qoidalari: [dasturchilar uchun yo‘riqnoma](docs/development.md).
