# خطوات تشغيل المشروع

## المشكلة الحالية
إذا واجهت خطأ `querySrv ECONNREFUSED` عند الاتصال بـ MongoDB، جرّب الحلول التالية:

### الحل 1: احصل على رابط اتصال جديد من Atlas

1. افتح [MongoDB Atlas](https://cloud.mongodb.com)
2. اذهب إلى الـ cluster الخاص بك
3. اضغط **Connect**
4. اختر **Drivers**
5. انسخ الرابط الجديد واستبدله في `server/.env`

### الحل 2: استخدم رابط بدون SRV

من نفس صفحة **Connect** → **Drivers**، ابحث عن الخيار الذي يقول:
"Use a connection string without SRV"

الرابط سيبدأ بـ `mongodb://` بدلاً من `mongodb+srv://`

### الحل 3: تأكد من إعدادات Network Access

1. في Atlas، افتح **Network Access** (من القائمة الجانبية)
2. تأكد أن `0.0.0.0/0` موجود في القائمة
3. إذا كنت ستستخدم في الإنتاج فقط، احذف `0.0.0.0/0` وأضف IP الخادم الحقيقي

## تشغيل المشروع

بعد حل مشكلة الاتصال:

```powershell
# 1. تهيئة البيانات (مرة واحدة فقط)
npm run seed --prefix server

# 2. تشغيل الخادم والواجهة معاً
npm run dev:all

# أو كل واحد منفصل:
npm run dev              # الواجهة فقط (port 5173)
npm run dev:server       # الخادم فقط (port 5000)
```

## الدخول للوحة التحكم

بعد التشغيل:
- افتح: http://localhost:5173/admin/login
- البريد: `asser6527i@gmail.com`
- كلمة المرور: `He@123456789`

## ملاحظات أمان

- **لا ترفع** `server/.env` إلى Git (موجود في `.gitignore`)
- غيّر `JWT_SECRET` في الإنتاج
- غيّر كلمة مرور MongoDB في Atlas إذا نُشرت في مكان عام
