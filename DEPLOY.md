# نشر الفرونت (Vercel) والباك (Render)

## 1) الخادم على Render

1. ادفع الكود إلى GitHub/GitLab.
2. في [Render](https://render.com): **New → Blueprint** (أو **Web Service** يدوياً).
3. إن استخدمت **Blueprint**: اربط المستودع؛ الملف `render.yaml` يضبط **Root Directory** على `server`.
4. إن أنشأت **Web Service** يدوياً:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. أضف **Environment** (من لوحة الخدمة → Environment):

| المتغير | الوصف |
|--------|--------|
| `MONGODB_URI` | اتصال MongoDB Atlas (أو غيره). |
| `JWT_SECRET` | سلسلة عشوائية طويلة. |
| `CLIENT_ORIGIN` | روابط الفرونت، مفصولة بفاصلة: `https://اسم-مشروعك.vercel.app` وأي دومين لاحقاً. |
| `PORT` | عادة يضبطه Render تلقائياً؛ لا تغيّره إلا إذا طُلب منك. |

6. بعد التشغيل انسخ عنوان الخدمة العام، مثل: `https://asser-api.onrender.com`.
7. تحقق: افتح `https://عنوانك.onrender.com/api/health` → يجب أن يظهر `{"ok":true}`.

**ملاحظة:** الملفات المرفوعة تُحفظ على قرص الخدمة؛ على الخطة المجانية قد تُفقد بعد إعادة نشر أو سياسات المنصة. لإنتاج طويل الأمد يُفضّل تخزين سحابي لاحقاً.

---

## 2) الواجهة على Vercel

1. [Vercel](https://vercel.com) → **Add New Project** → استورد نفس المستودع.
2. **Framework Preset**: Vite.
3. **Root Directory**: جذر المشروع (المجلد الذي فيه `package.json` و`vite.config.js`).
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. في **Environment Variables** أضف:

| الاسم | القيمة |
|--------|--------|
| `VITE_API_URL` | نفس عنوان Render بدون `/` في النهاية، مثال: `https://asser-api.onrender.com` |

7. انشر (Deploy). بعد الانتهاء أضف نفس رابط Vercel (`https://....vercel.app`) إلى `CLIENT_ORIGIN` على Render (**إعادة نشر** الخادم إن لزم).

---

## 3) الترتيب المقترح

1. انشر **Render** أولاً واحصل على رابط الـ API.
2. ضع `VITE_API_URL` في **Vercel** ثم انشر الفرونت.
3. حدّث `CLIENT_ORIGIN` على **Render** ليشمل رابط Vercel ثم **Manual Deploy** للخادم إذا احتجت.

بهذا يتصل الفرونت بالـ API، ويُحمَّل `/uploads/...` من الخادم عبر `resolveMediaUrl` و`VITE_API_URL`.
