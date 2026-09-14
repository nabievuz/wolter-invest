# Ma’lumotlar va hisoblash modeli

[README’ga qaytish](../README.md)

Bu hujjat saytdagi raqamlarning kelib chiqishi va hisobdagi farazlarni tushuntiradi. Kompaniya ko‘rsatkichlari mustaqil audit natijasi sifatida taqdim etilmaydi.

## Klaster va investor modeli

Hisob manbasi: `src/lib/model.ts`.

| Parametr | Qiymat |
| --- | --- |
| Almashtirish kabineti | 1 × $3,300 |
| Elektr velosiped | 14 × $410 |
| Batareya | 21 × $270 |
| Jami klaster qiymati | $14,710 |
| Model muddati | 48 oy |
| Kapital qoplanguncha investor ulushi | Taqsimlanadigan sof foydaning 70%i |
| Keyingi investor ulushi | 30% |
| USD ko‘rinishi uchun hisobiy kurs | 12,000 UZS/USD; joriy kurs emas |

Ulush kapital qoplangan oydan keyingi oyda almashadi. 48 oyda kapital qoplanmasa, hisob `null` qaytaradi va interfeys qoplanmaganini ko‘rsatadi. Model bo‘yicha aktivlar 48-oy oxirida Wolter’ga o‘tadi; qoplanmagan kapitalga qo‘llanadigan tartib shartnomada ko‘rib chiqiladi.

SWAP ma’lumotlari 48 kun, ijara ma’lumotlari 18 kun asosida 30 kunlik qiymatga keltiriladi. Bular dastlabki repodagi model kirishlari; quyidagi may–avgust tushumlari ularning o‘rniga qo‘yilmagan.

Hisob foydani o‘zgarmas deb oladi va klasterlar soniga mutanosib oshiradi. Qo‘shimcha ta’mir/almashtirish, investorga tegishli soliqlar, to‘lov kechikishlari va kurs o‘zgarishlari hisobga kiritilmagan. Pastroq/bazaviy/yuqoriroq ssenariylar 85%/100%/115%; interfeysdagi stress boshqaruvi 0–125%. Ssenariylarga ehtimollik berilmagan.

Jami to‘lov, kapitaldan ortiq tushum, ROI va yillik IRR turli ko‘rsatkichlardir. IRR qat’iy yillik to‘lov emas. Model natijalari daromad kafolati hisoblanmaydi.

## 2026-yil may–avgust tushumlari

Manba: kompaniya egasi 2026-yil 13-sentabrda taqdim etgan jadval; kodda `src/lib/revenue.ts`.

Barcha pul summalari **UZS**. “E-bike rental” — ijara operatsiyalari soni, noyob mijozlar yoki velosipedlar soni emas.

| Oy | Ijara soni | SWAP soni | E-bike tushumi, UZS | SWAP tushumi, UZS | Jami, UZS |
| --- | ---: | ---: | ---: | ---: | ---: |
| May | 413 | 3,387 | 162,286,732 | 76,207,500 | 238,494,232 |
| Iyun | 577 | 7,085 | 212,472,000 | 159,412,500 | 371,884,500 |
| Iyul | 557 | 8,489 | 213,619,000 | 191,002,500 | 404,621,500 |
| Avgust | 540 | 7,920 | 204,186,000 | 178,200,000 | 382,386,000 |

To‘rt oy jami: **1,397,386,232 UZS**. Grafik nol asosidan boshlanadi va avgustdagi pasayishni ham ko‘rsatadi. Jami qiymatlar va oylik o‘zgarishlar komponentda manba raqamlaridan hisoblanadi.

Bu raqamlar oylik tushumdir. Sof foyda, investor ulushi yoki faqat takrorlanuvchi obunalardan tushadigan MRR ekanini tasdiqlovchi ma’lumot berilmagan. Xarajatlar va marja ushbu jadvalda yo‘q.

## May 2026 piloti

Kompaniya taqdim etgan boshqaruv paneli tasviridagi holat:

- Jami foydalanuvchilar: **2,112**.
- Faol: **189**.
- Nofaol: **1,923**.

Faol/nofaol — paneldagi statuslar. Faollik mezoni va vaqt oralig‘i aniqlashtirilmagan; ularni oylik faol yoki to‘lov qiluvchi mijozlar deb atamaymiz. Bu ko‘rsatkichlar investor modeliga kirish sifatida ishlatilmaydi.

## Hamkorlik va jamoa

Kompaniya egasi 2026-yil 13-sentabrda ijara tuzilmasi va yuridik xulosa tayyorligini, egalik va operator majburiyatlari shartnomada belgilanganini hamda shu tuzilma asosida **$250,000** jalb qilinganini tasdiqlagan. Jalb qilingan mablag‘ tushum yoki kalkulyatordagi foyda hisobiga qo‘shilmaydi. Repo yuridik xulosa matni yoki mustaqil Sharia sertifikatini taqdim etmaydi.

Suratdagi a’zolar kompaniyaning asosiy qaror qabul qiluvchi jamoasi sifatida ko‘rsatilgan. Kompaniya taqdim etgan ma’lumotga ko‘ra, operatsion jamoa **25 kishi**dan iborat. Bu sonni rasmdagi a’zolar bilan qo‘shib umumiy xodimlar soni deb hisoblamaymiz.

## Taqdimot tamoyili

Sayt aniq ma’lumotlar iyerarxiyasi, ko‘rinadigan aktivlar, bosqichma-bosqich tafsilotlar va erkin ssenariy sinash imkoniyatidan foydalanadi. Miya faoliyati o‘lchangani yoki konversiya oshgani haqida da’vo qilinmaydi.
