# خادم API (Express + MongoDB)

## الإعداد

1. انسخ `.env.example` إلى `.env` داخل مجلد `server/`.
2. عبّئ المتغيرات:
   - `MONGODB_URI` — سلسلة اتصال MongoDB Atlas (لا ترفعها إلى Git).
   - `JWT_SECRET` — نص عشوائي طويل (لتوقيع JWT).
   - `PORT` — المنفذ (افتراضي 5000).
   - `CLIENT_ORIGIN` — أصل الواجهة للـ CORS، مثال: `http://localhost:5173`.

## التشغيل

```bash
npm install
npm run dev
```

## تهيئة البيانات (اختياري)

ينشئ محتوى الموقع الافتراضي من ملفات `src/data` في الواجهة، ومستخدم مشرف **فقط إذا كانت مجموعة المستخدمين فارغة**.

في `server/.env` عيّن على الأقل:

- `MONGODB_URI`
- `JWT_SECRET`
- `SEED_ADMIN_EMAIL` و `SEED_ADMIN_PASSWORD` (مطلوبان لإنشاء أول مشرف عبر الـ seed)

ثم:

```bash
npm run seed
```

إذا وُجد مستخدمون مسبقاً، لن يُنشَأ أدمن جديد من الـ seed.

## الواجهات

| المسار | الوصف |
|--------|--------|
| `GET /api/health` | فحص الخادم |
| `GET /api/auth/status` | هل يوجد مستخدمون (`hasUsers`) |
| `POST /api/auth/register-first` | أول مستخدم فقط |
| `POST /api/auth/login` | تسجيل الدخول |
| `GET /api/content` | محتوى الصفحة الرئيسية |
| `PUT /api/content` | تحديث المحتوى (JWT: admin أو editor) |
| `GET /api/marketing` | مقاطع البيكسل |
| `PUT /api/marketing` | تحديث البيكسل (JWT: admin فقط) |
| `GET/POST/PATCH/DELETE /api/users` | المستخدمون (JWT: admin) |
