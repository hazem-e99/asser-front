import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api.js";
import { useSiteContent } from "../context/SiteContentContext.jsx";
import { normalizePayload } from "./content/normalizePayload.js";
import MediaUrlField from "./content/MediaUrlField.jsx";

const inp = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  boxSizing: "border-box",
  fontFamily: "'Cairo', sans-serif",
};

const tabs = [
  { id: "general", label: "الشعار والقائمة والبانر" },
  { id: "services", label: "الخدمات" },
  { id: "tours", label: "الجولات والأماكن" },
  { id: "bikes", label: "الدراجات" },
  { id: "about", label: "من أكون" },
  { id: "reviews", label: "التقييمات" },
  { id: "footer", label: "الفوتر والتواصل" },
];

function Row({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#333" }}>{label}</label>
      {children}
    </div>
  );
}

export default function ContentEditor() {
  const { refetch: refetchSite } = useSiteContent();
  const [payload, setPayload] = useState(null);
  const [tab, setTab] = useState("general");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiFetch("/api/content")
      .then((d) => {
        setPayload(normalizePayload(d.payload));
        setErr("");
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      await apiFetch("/api/content", {
        method: "PUT",
        body: JSON.stringify({ payload }),
      });
      setMsg("تم حفظ التعديلات بنجاح.");
      await refetchSite();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !payload) return <p style={{ fontFamily: "'Cairo', sans-serif" }}>جاري التحميل...</p>;

  return (
    <div style={{ fontFamily: "'Cairo', sans-serif" }}>
      <h1 style={{ color: "#30684b", marginBottom: 8 }}>محتوى الصفحة الرئيسية</h1>
      <p style={{ color: "#666", marginBottom: 20, fontSize: 14 }}>
        عدّل النصوص والروابط من النماذج أدناه — لا حاجة لأي صيغة برمجية.
      </p>

      {err && (
        <div style={{ background: "#ffebee", color: "#c62828", padding: 12, borderRadius: 8, marginBottom: 12 }}>
          {err}
        </div>
      )}
      {msg && (
        <div style={{ background: "#e8f5e9", color: "#30684b", padding: 12, borderRadius: 8, marginBottom: 12 }}>
          {msg}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 24,
          borderBottom: "1px solid #ddd",
          paddingBottom: 16,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: tab === t.id ? "2px solid #30684b" : "1px solid #ccc",
              background: tab === t.id ? "#e8f5e9" : "#fff",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: tab === t.id ? 700 : 500,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          border: "1px solid #e0e0e0",
          marginBottom: 24,
        }}
      >
        {tab === "general" && <GeneralTab payload={payload} setPayload={setPayload} />}
        {tab === "services" && <ServicesTab payload={payload} setPayload={setPayload} />}
        {tab === "tours" && <ToursTab payload={payload} setPayload={setPayload} />}
        {tab === "bikes" && <BikesTab payload={payload} setPayload={setPayload} />}
        {tab === "about" && <AboutTab payload={payload} setPayload={setPayload} />}
        {tab === "reviews" && <ReviewsTab payload={payload} setPayload={setPayload} />}
        {tab === "footer" && <FooterTab payload={payload} setPayload={setPayload} />}
      </div>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        style={{
          padding: "14px 32px",
          background: "#30684b",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 800,
          cursor: saving ? "wait" : "pointer",
          fontFamily: "'Cairo', sans-serif",
          fontSize: "1.05rem",
        }}
      >
        {saving ? "جاري الحفظ..." : "حفظ كل التعديلات"}
      </button>
    </div>
  );
}

function GeneralTab({ payload, setPayload }) {
  return (
    <>
      <h3 style={{ color: "#30684b", marginBottom: 16 }}>صور ووسائط</h3>
      <MediaUrlField
        label="شعار الهيدر والفوتر (صورة)"
        accept="image/*"
        value={payload.assets.logoUrl}
        onChange={(url) => setPayload((p) => ({ ...p, assets: { ...p.assets, logoUrl: url } }))}
      />
      <MediaUrlField
        label="صورة البانر الرئيسي (الصورة العريضة أعلى الصفحة)"
        accept="image/*"
        value={payload.assets.heroBannerUrl}
        onChange={(url) =>
          setPayload((p) => ({ ...p, assets: { ...p.assets, heroBannerUrl: url } }))
        }
      />
      <MediaUrlField
        label="فيديو خلفية قسم الجولات (ملف mp4 أو رابط)"
        accept="video/*,.mp4"
        value={payload.assets.toursVideoUrl}
        onChange={(url) =>
          setPayload((p) => ({ ...p, assets: { ...p.assets, toursVideoUrl: url } }))
        }
      />

      <h3 style={{ color: "#30684b", margin: "24px 0 16px" }}>قائمة التنقل (الهيدر)</h3>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>
        الرابط يكون مثل #services أو #about حسب القسم في الصفحة.
      </p>
      {payload.navLinks.map((item, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
            gap: 8,
            alignItems: "end",
            marginBottom: 10,
          }}
        >
          <Row label={i === 0 ? "النص الظاهر" : ""}>
            <input
              style={inp}
              value={item.label}
              onChange={(e) => {
                const navLinks = [...payload.navLinks];
                navLinks[i] = { ...navLinks[i], label: e.target.value };
                setPayload((p) => ({ ...p, navLinks }));
              }}
            />
          </Row>
          <Row label={i === 0 ? "الرابط (anchor)" : ""}>
            <input
              style={{ ...inp, direction: "ltr", textAlign: "left" }}
              value={item.href}
              onChange={(e) => {
                const navLinks = [...payload.navLinks];
                navLinks[i] = { ...navLinks[i], href: e.target.value };
                setPayload((p) => ({ ...p, navLinks }));
              }}
            />
          </Row>
          <button
            type="button"
            onClick={() => {
              const navLinks = payload.navLinks.filter((_, j) => j !== i);
              setPayload((p) => ({ ...p, navLinks }));
            }}
            style={{
              padding: "10px 12px",
              background: "#ffebee",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            حذف
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setPayload((p) => ({
            ...p,
            navLinks: [...p.navLinks, { href: "#", label: "عنصر جديد" }],
          }))
        }
        style={{
          marginTop: 8,
          padding: "8px 16px",
          background: "#eee",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        + إضافة رابط في القائمة
      </button>
    </>
  );
}

function ServicesTab({ payload, setPayload }) {
  return (
    <>
      <Row label="عنوان قسم الخدمات">
        <input
          style={inp}
          value={payload.servicesTitle}
          onChange={(e) => setPayload((p) => ({ ...p, servicesTitle: e.target.value }))}
        />
      </Row>
      <h3 style={{ color: "#30684b", margin: "20px 0 12px" }}>بطاقات الخدمات</h3>
      {payload.services.map((s, i) => (
        <div
          key={i}
          style={{
            padding: 16,
            marginBottom: 16,
            background: "#f9f9f9",
            borderRadius: 12,
            border: "1px solid #eee",
          }}
        >
          <MediaUrlField
            label="صورة الخدمة (رابط أو رفع)"
            accept="image/*"
            value={s.img}
            onChange={(url) => {
              const services = [...payload.services];
              services[i] = { ...services[i], img: url };
              setPayload((p) => ({ ...p, services }));
            }}
          />
          <Row label="العنوان">
            <input
              style={inp}
              value={s.title}
              onChange={(e) => {
                const services = [...payload.services];
                services[i] = { ...services[i], title: e.target.value };
                setPayload((p) => ({ ...p, services }));
              }}
            />
          </Row>
          <Row label="الوصف">
            <textarea
              style={{ ...inp, minHeight: 72, resize: "vertical" }}
              value={s.desc}
              onChange={(e) => {
                const services = [...payload.services];
                services[i] = { ...services[i], desc: e.target.value };
                setPayload((p) => ({ ...p, services }));
              }}
            />
          </Row>
          <button
            type="button"
            onClick={() => {
              const services = payload.services.filter((_, j) => j !== i);
              setPayload((p) => ({ ...p, services }));
            }}
            style={{
              padding: "8px 14px",
              background: "#ffebee",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            حذف هذه الخدمة
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setPayload((p) => ({
            ...p,
            services: [...p.services, { img: "", title: "", desc: "" }],
          }))
        }
        style={{
          padding: "10px 18px",
          background: "#eee",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        + إضافة خدمة
      </button>
    </>
  );
}

function ToursTab({ payload, setPayload }) {
  return (
    <>
      <Row label="عنوان قسم الجولات (فوق الفيديو)">
        <input
          style={inp}
          value={payload.toursHeroTitle}
          onChange={(e) => setPayload((p) => ({ ...p, toursHeroTitle: e.target.value }))}
        />
      </Row>
      <h3 style={{ color: "#30684b", margin: "24px 0 12px" }}>شبكة الأماكن</h3>
      {payload.places.map((pl, i) => (
        <div
          key={i}
          style={{
            padding: 16,
            marginBottom: 16,
            background: "#f9f9f9",
            borderRadius: 12,
            border: "1px solid #eee",
          }}
        >
          <MediaUrlField
            label={`صورة المكان ${i + 1}`}
            accept="image/*"
            value={pl.img}
            onChange={(url) => {
              const places = [...payload.places];
              places[i] = { ...places[i], img: url };
              setPayload((p) => ({ ...p, places }));
            }}
          />
          <Row label="اسم المكان">
            <input
              style={inp}
              value={pl.title}
              onChange={(e) => {
                const places = [...payload.places];
                places[i] = { ...places[i], title: e.target.value };
                setPayload((p) => ({ ...p, places }));
              }}
            />
          </Row>
          <button
            type="button"
            onClick={() => {
              const places = payload.places.filter((_, j) => j !== i);
              setPayload((p) => ({ ...p, places }));
            }}
            style={{ padding: "10px 14px", background: "#ffebee", border: "none", borderRadius: 8 }}
          >
            حذف المكان
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setPayload((p) => ({
            ...p,
            places: [...p.places, { img: "", title: "" }],
          }))
        }
        style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 8 }}
      >
        + إضافة مكان
      </button>
    </>
  );
}

function BikesTab({ payload, setPayload }) {
  const bikeImages = payload.bikes.bikeImages?.length ? payload.bikes.bikeImages : [""];
  return (
    <>
      <MediaUrlField
        label="صورة البانر العريضة فوق السلايدر"
        accept="image/*"
        value={payload.bikes.bikesBannerImage}
        onChange={(url) =>
          setPayload((p) => ({
            ...p,
            bikes: { ...p.bikes, bikesBannerImage: url },
          }))
        }
      />
      <h3 style={{ color: "#30684b", margin: "20px 0 12px" }}>صور سلايدر الدراجات</h3>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>لكل صورة: رابط أو رفع من الجهاز.</p>
      {bikeImages.map((url, i) => (
        <div
          key={i}
          style={{
            marginBottom: 16,
            padding: 12,
            background: "#f9f9f9",
            borderRadius: 10,
          }}
        >
          <MediaUrlField
            label={`صورة ${i + 1}`}
            accept="image/*"
            value={url}
            onChange={(u) => {
              const next = [...(payload.bikes.bikeImages || [])];
              if (!next.length) next.push("");
              next[i] = u;
              setPayload((p) => ({ ...p, bikes: { ...p.bikes, bikeImages: next } }));
            }}
          />
          <button
            type="button"
            onClick={() => {
              const next = (payload.bikes.bikeImages || []).filter((_, j) => j !== i);
              setPayload((p) => ({ ...p, bikes: { ...p.bikes, bikeImages: next } }));
            }}
            style={{
              padding: "8px 12px",
              background: "#ffebee",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            حذف الصورة
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setPayload((p) => ({
            ...p,
            bikes: {
              ...p.bikes,
              bikeImages: [...(p.bikes.bikeImages || []), ""],
            },
          }))
        }
        style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 8 }}
      >
        + إضافة صورة للسلايدر
      </button>
    </>
  );
}

function AboutTab({ payload, setPayload }) {
  const a = payload.about;
  return (
    <>
      <Row label="الاسم">
        <input style={inp} value={a.name} onChange={(e) => setPayload((p) => ({ ...p, about: { ...p.about, name: e.target.value } }))} />
      </Row>
      <Row label="العنوان الفرعي (مثلاً مرشد سياحي مرخص)">
        <input
          style={inp}
          value={a.subtitle}
          onChange={(e) => setPayload((p) => ({ ...p, about: { ...p.about, subtitle: e.target.value } }))}
        />
      </Row>
      <Row label="المقدمة">
        <textarea
          style={{ ...inp, minHeight: 90 }}
          value={a.intro}
          onChange={(e) => setPayload((p) => ({ ...p, about: { ...p.about, intro: e.target.value } }))}
        />
      </Row>
      <Row label="عنوان فقرة الرؤية">
        <input
          style={inp}
          value={a.visionTitle}
          onChange={(e) => setPayload((p) => ({ ...p, about: { ...p.about, visionTitle: e.target.value } }))}
        />
      </Row>
      <Row label="نص الرؤية">
        <textarea
          style={{ ...inp, minHeight: 90 }}
          value={a.visionText}
          onChange={(e) => setPayload((p) => ({ ...p, about: { ...p.about, visionText: e.target.value } }))}
        />
      </Row>
      <Row label="عنوان فقرة الرسالة">
        <input
          style={inp}
          value={a.missionTitle ?? ""}
          onChange={(e) => setPayload((p) => ({ ...p, about: { ...p.about, missionTitle: e.target.value } }))}
        />
      </Row>
      <Row label="نص الرسالة">
        <textarea
          style={{ ...inp, minHeight: 90 }}
          value={a.missionText ?? ""}
          onChange={(e) => setPayload((p) => ({ ...p, about: { ...p.about, missionText: e.target.value } }))}
        />
      </Row>
      <Row label="عنوان قائمة «لماذا تختارني»">
        <input
          style={inp}
          value={a.whyTitle}
          onChange={(e) => setPayload((p) => ({ ...p, about: { ...p.about, whyTitle: e.target.value } }))}
        />
      </Row>
      <MediaUrlField
        label="صورة الشخص بجانب النص (رابط أو رفع)"
        accept="image/*"
        value={a.aboutPortraitUrl}
        onChange={(url) => setPayload((p) => ({ ...p, about: { ...p.about, aboutPortraitUrl: url } }))}
      />

      <h3 style={{ color: "#30684b", margin: "24px 0 12px" }}>نقاط «لماذا تختارني»</h3>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
        أيقونة Font Awesome كما تُكتب في الكلاس، مثل: fa-certificate أو fa-map-marked-alt
      </p>
      {a.reasons.map((r, i) => (
        <div key={i} style={{ padding: 16, marginBottom: 12, background: "#f9f9f9", borderRadius: 12 }}>
          <Row label="الأيقونة (اسم الصنف)">
            <input
              style={{ ...inp, direction: "ltr" }}
              value={r.icon}
              onChange={(e) => {
                const reasons = [...a.reasons];
                reasons[i] = { ...reasons[i], icon: e.target.value };
                setPayload((p) => ({ ...p, about: { ...p.about, reasons } }));
              }}
            />
          </Row>
          <Row label="العنوان بخط عريض">
            <input
              style={inp}
              value={r.bold}
              onChange={(e) => {
                const reasons = [...a.reasons];
                reasons[i] = { ...reasons[i], bold: e.target.value };
                setPayload((p) => ({ ...p, about: { ...p.about, reasons } }));
              }}
            />
          </Row>
          <Row label="باقي النص">
            <textarea
              style={{ ...inp, minHeight: 56 }}
              value={r.text}
              onChange={(e) => {
                const reasons = [...a.reasons];
                reasons[i] = { ...reasons[i], text: e.target.value };
                setPayload((p) => ({ ...p, about: { ...p.about, reasons } }));
              }}
            />
          </Row>
          <button
            type="button"
            onClick={() => {
              const reasons = a.reasons.filter((_, j) => j !== i);
              setPayload((p) => ({ ...p, about: { ...p.about, reasons } }));
            }}
            style={{ padding: "8px 14px", background: "#ffebee", border: "none", borderRadius: 8 }}
          >
            حذف
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setPayload((p) => ({
            ...p,
            about: {
              ...p.about,
              reasons: [...p.about.reasons, { icon: "fa-check", bold: "عنوان:", text: " نص" }],
            },
          }))
        }
        style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 8 }}
      >
        + إضافة نقطة
      </button>
    </>
  );
}

function ReviewsTab({ payload, setPayload }) {
  const rev = payload.reviews;
  const galleryImages = rev.reviewsImages?.length ? rev.reviewsImages : [""];
  return (
    <>
      <Row label="عنوان شريط صور التقييمات (الأعلى)">
        <input
          style={inp}
          value={rev.galleryTitle}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              reviews: { ...p.reviews, galleryTitle: e.target.value },
            }))
          }
        />
      </Row>
      <Row label="عنوان قسم التقييمات النصية">
        <input
          style={inp}
          value={rev.newReviewsTitle}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              reviews: { ...p.reviews, newReviewsTitle: e.target.value },
            }))
          }
        />
      </Row>
      <h3 style={{ color: "#30684b", margin: "16px 0 8px" }}>صور سلايدر التقييمات</h3>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>لكل صورة: رابط أو رفع من الجهاز.</p>
      {galleryImages.map((url, i) => (
        <div
          key={i}
          style={{
            marginBottom: 16,
            padding: 12,
            background: "#f9f9f9",
            borderRadius: 10,
          }}
        >
          <MediaUrlField
            label={`صورة السلايدر ${i + 1}`}
            accept="image/*"
            value={url}
            onChange={(u) => {
              const next = [...(rev.reviewsImages || [])];
              if (!next.length) next.push("");
              next[i] = u;
              setPayload((p) => ({
                ...p,
                reviews: { ...p.reviews, reviewsImages: next },
              }));
            }}
          />
          <button
            type="button"
            onClick={() => {
              const next = (rev.reviewsImages || []).filter((_, j) => j !== i);
              setPayload((p) => ({
                ...p,
                reviews: { ...p.reviews, reviewsImages: next },
              }));
            }}
            style={{
              padding: "8px 12px",
              background: "#ffebee",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            حذف الصورة
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setPayload((p) => ({
            ...p,
            reviews: {
              ...p.reviews,
              reviewsImages: [...(p.reviews.reviewsImages || []), ""],
            },
          }))
        }
        style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 8, marginBottom: 24 }}
      >
        + إضافة صورة للسلايدر
      </button>

      <h3 style={{ color: "#30684b", margin: "24px 0 12px" }}>تقييمات نصية</h3>
      {rev.staticReviews.map((sr, i) => (
        <div key={i} style={{ padding: 16, marginBottom: 16, background: "#f9f9f9", borderRadius: 12 }}>
          <Row label="النص الكامل">
            <textarea
              style={{ ...inp, minHeight: 100 }}
              value={sr.text}
              onChange={(e) => {
                const staticReviews = [...rev.staticReviews];
                staticReviews[i] = { ...staticReviews[i], text: e.target.value };
                setPayload((p) => ({ ...p, reviews: { ...p.reviews, staticReviews } }));
              }}
            />
          </Row>
          <Row label="اسم العميل">
            <input
              style={inp}
              value={sr.name}
              onChange={(e) => {
                const staticReviews = [...rev.staticReviews];
                staticReviews[i] = { ...staticReviews[i], name: e.target.value };
                setPayload((p) => ({ ...p, reviews: { ...p.reviews, staticReviews } }));
              }}
            />
          </Row>
          <Row label="الوصف (مثلاً سائح من الرياض)">
            <input
              style={inp}
              value={sr.from}
              onChange={(e) => {
                const staticReviews = [...rev.staticReviews];
                staticReviews[i] = { ...staticReviews[i], from: e.target.value };
                setPayload((p) => ({ ...p, reviews: { ...p.reviews, staticReviews } }));
              }}
            />
          </Row>
          <Row label="حرف بالدائرة (مثلاً ف)">
            <input
              style={{ ...inp, maxWidth: 80 }}
              value={sr.initial}
              onChange={(e) => {
                const staticReviews = [...rev.staticReviews];
                staticReviews[i] = { ...staticReviews[i], initial: e.target.value.slice(0, 2) };
                setPayload((p) => ({ ...p, reviews: { ...p.reviews, staticReviews } }));
              }}
            />
          </Row>
          <button
            type="button"
            onClick={() => {
              const staticReviews = rev.staticReviews.filter((_, j) => j !== i);
              setPayload((p) => ({ ...p, reviews: { ...p.reviews, staticReviews } }));
            }}
            style={{ padding: "8px 14px", background: "#ffebee", border: "none", borderRadius: 8 }}
          >
            حذف التقييم
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setPayload((p) => ({
            ...p,
            reviews: {
              ...p.reviews,
              staticReviews: [
                ...p.reviews.staticReviews,
                { text: '"نص التقييم"', name: "الاسم", from: "من أين", initial: "؟" },
              ],
            },
          }))
        }
        style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 8 }}
      >
        + إضافة تقييم
      </button>
    </>
  );
}

function FooterTab({ payload, setPayload }) {
  const f = payload.footer;
  return (
    <>
      <h3 style={{ color: "#30684b", marginBottom: 16 }}>زر الواتساب العائم</h3>
      <Row label="رابط واتساب كامل (يفتح المحادثة)">
        <input
          style={{ ...inp, direction: "ltr", textAlign: "left" }}
          value={payload.floating.whatsappUrl}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              floating: { ...p.floating, whatsappUrl: e.target.value },
            }))
          }
        />
      </Row>

      <h3 style={{ color: "#30684b", margin: "28px 0 16px" }}>الفوتر</h3>
      <Row label="عنوان عمود الخدمات">
        <input
          style={inp}
          value={f.servicesColumnTitle}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              footer: { ...p.footer, servicesColumnTitle: e.target.value },
            }))
          }
        />
      </Row>
      <Row label="عنوان عمود التواصل">
        <input
          style={inp}
          value={f.contactColumnTitle}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              footer: { ...p.footer, contactColumnTitle: e.target.value },
            }))
          }
        />
      </Row>
      <Row label="نقاط الخدمات في الفوتر (سطر لكل نقطة)">
        <textarea
          style={{ ...inp, minHeight: 100 }}
          value={f.footerServices.join("\n")}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              footer: {
                ...p.footer,
                footerServices: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              },
            }))
          }
        />
      </Row>
      <Row label="نص قبل رقم الواتساب (مثلاً واتس آب: )">
        <input
          style={inp}
          value={f.whatsappLabel}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              footer: { ...p.footer, whatsappLabel: e.target.value },
            }))
          }
        />
      </Row>
      <Row label="رقم الواتساب كما يظهر للزائر">
        <input
          style={{ ...inp, direction: "ltr", textAlign: "left" }}
          value={f.whatsappDisplay}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              footer: { ...p.footer, whatsappDisplay: e.target.value },
            }))
          }
        />
      </Row>
      <Row label="رابط الخريطة">
        <input
          style={{ ...inp, direction: "ltr", textAlign: "left" }}
          value={f.mapsUrl}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              footer: { ...p.footer, mapsUrl: e.target.value },
            }))
          }
        />
      </Row>
      <Row label="نص زر الخريطة">
        <input
          style={inp}
          value={f.mapsButtonText}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              footer: { ...p.footer, mapsButtonText: e.target.value },
            }))
          }
        />
      </Row>

      <h3 style={{ color: "#30684b", margin: "24px 0 12px" }}>روابط السوشال</h3>
      <p style={{ fontSize: 13, color: "#666" }}>أيقونة Font Awesome: fa-instagram أو fa-tiktok إلخ</p>
      {f.socialLinks.map((sl, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginBottom: 10, alignItems: "end" }}>
          <Row label={i === 0 ? "الرابط" : ""}>
            <input
              style={{ ...inp, direction: "ltr", textAlign: "left" }}
              value={sl.href}
              onChange={(e) => {
                const socialLinks = [...f.socialLinks];
                socialLinks[i] = { ...socialLinks[i], href: e.target.value };
                setPayload((p) => ({ ...p, footer: { ...p.footer, socialLinks } }));
              }}
            />
          </Row>
          <Row label={i === 0 ? "الأيقونة (fa-...)" : ""}>
            <input
              style={{ ...inp, direction: "ltr" }}
              value={sl.icon}
              onChange={(e) => {
                const socialLinks = [...f.socialLinks];
                socialLinks[i] = { ...socialLinks[i], icon: e.target.value };
                setPayload((p) => ({ ...p, footer: { ...p.footer, socialLinks } }));
              }}
            />
          </Row>
          <button
            type="button"
            onClick={() => {
              const socialLinks = f.socialLinks.filter((_, j) => j !== i);
              setPayload((p) => ({ ...p, footer: { ...p.footer, socialLinks } }));
            }}
            style={{ padding: "10px 12px", background: "#ffebee", border: "none", borderRadius: 8 }}
          >
            حذف
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setPayload((p) => ({
            ...p,
            footer: {
              ...p.footer,
              socialLinks: [...p.footer.socialLinks, { href: "https://", icon: "fa-link" }],
            },
          }))
        }
        style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 8 }}
      >
        + إضافة منصة
      </button>
    </>
  );
}
