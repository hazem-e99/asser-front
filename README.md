# asser-tours – موقع عبد الله العسيري (React + Vite + Node API)

موقع تعريفي لمرشد سياحي في أبها وعسير، مع **لوحة تحكم** لتحرير المحتوى وأكواد التسويق، وخادم **Express** متصل بـ **MongoDB Atlas**.

## المتطلبات

- Node.js 18 أو أحدث  
- npm  
- حساب MongoDB Atlas وسلسلة اتصال آمنة

## الإعداد السريع

1. **الواجهة:** من جذر المشروع `npm install`.
2. **الخادم:** `npm install --prefix server`.
3. أنشئ `server/.env` انطلاقاً من [`server/.env.example`](server/.env.example): ضع `MONGODB_URI` و`JWT_SECRET` و`CLIENT_ORIGIN=http://localhost:5173`.
4. (اختياري) تهيئة المحتوى والأدمن: `npm run seed --prefix server`.
5. تشغيل الواجهة والخادم معاً:

```bash
npm run dev:all
```

- الواجهة: `http://localhost:5173` — الطلبات إلى `/api` تُوجَّه عبر proxy إلى المنفذ `5000`.
- لوحة التحكم: `http://localhost:5173/admin/login` — إن لم يكن هناك مستخدمون، سيُعرض إنشاء **أول حساب مشرف**.

انسخ [`.env.example`](.env.example) إلى `.env` في الجذر إذا احتجت `VITE_API_URL` في الإنتاج (اتركه فارغاً في التطوير إذا استخدمت الـ proxy).

## تشغيل الواجهة أو الخادم منفصلين

```bash
npm run dev              # Vite فقط
npm run dev:server       # API فقط
```

## البناء للإنتاج

```bash
npm run build
```

المخرجات في `dist/`. في الإنتاج يجب استضافة الخادم وخدمة الواجهة مع ضبط `VITE_API_URL` أو reverse proxy لمسار `/api`.

## هيكل المشروع

- `src/components/` — المكونات (layout، sections، cards، common)
- `src/context/` — محتوى الموقع من API، وجلسة الأدمن
- `src/admin/` — صفحات لوحة التحكم
- `src/data/` — القيم الاحتياطية عند تعطل API
- `server/` — REST API و Mongoose

تفاصيل الخادم في [`server/README.md`](server/README.md).

## لوحة التحكم

- تحرير محتوى الصفحة الرئيسية كاملًا كـ JSON (يشمل الهيدر، الفوتر، الأقسام، الصور مركزياً في الحقل `payload`).
- **المشرف فقط:** مستخدمون إضافيون، وأكواد البيكسل والتسويق.
- معاينة مع شريط تنبيه: افتح الموقع مع `?edit=1` بعد تسجيل الدخول.

## ملاحظات أمنية

- لا ترفع `server/.env` أو سلسلة اتصال Mongo تحتوي كلمة مرور إلى Git.
- غيّر كلمة مرور مستخدم قاعدة البيانات إذا سُرّبت سابقاً.

## الترخيص

خاص بالمشروع.
