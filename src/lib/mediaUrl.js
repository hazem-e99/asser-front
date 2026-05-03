/** في الإنتاج: يُسبق مسار `/uploads/...` بـ `VITE_API_URL` حتى تُحمَّل من الخادم وليس من Vercel. */
const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export function resolveMediaUrl(url) {
  if (!url || typeof url !== "string") return url;
  const u = url.trim();
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith("/")) return API_BASE ? `${API_BASE}${u}` : u;
  return u;
}
