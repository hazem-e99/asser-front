import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api.js";
import {
  PLATFORM_OPTIONS,
  buildCodeFromPreset,
  getPresetFieldDefs,
} from "../lib/marketingPresets.js";

function normalizeSnippet(s, index) {
  return {
    name: s?.name || `مقطع ${index + 1}`,
    placement: s?.placement === "bodyEnd" ? "bodyEnd" : "head",
    code: s?.code ?? "",
    platform: s?.platform || "custom",
    presetFields:
      s?.presetFields && typeof s.presetFields === "object"
        ? { ...s.presetFields }
        : {},
  };
}

function emptySnippet(i) {
  return {
    name: `مقطع ${i + 1}`,
    placement: "head",
    platform: "custom",
    presetFields: {},
    code: "",
  };
}

export default function MarketingPixelsPage() {
  const [snippets, setSnippets] = useState([]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch("/api/marketing")
      .then((d) => {
        const list = d.snippets?.length ? d.snippets : [emptySnippet(0)];
        setSnippets(list.map(normalizeSnippet));
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  function updateSnippet(i, patch) {
    setSnippets((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      return next;
    });
  }

  function updatePresetField(i, key, value) {
    setSnippets((prev) => {
      const next = [...prev];
      const pf = { ...(next[i].presetFields || {}), [key]: value };
      next[i] = { ...next[i], presetFields: pf };
      return next;
    });
  }

  function applyGeneratedCode(i) {
    const s = snippets[i];
    const code = buildCodeFromPreset(s.platform, s.presetFields);
    if (!code && s.platform !== "custom") {
      setErr("أكمل المعرفات أولاً ثم اضغط تحديث الكود.");
      return;
    }
    if (code) {
      updateSnippet(i, { code });
      setErr("");
    }
  }

  async function save() {
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      await apiFetch("/api/marketing", {
        method: "PUT",
        body: JSON.stringify({ snippets }),
      });
      setMsg("تم الحفظ.");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p style={{ fontFamily: "'Cairo', sans-serif" }}>جاري التحميل...</p>;

  return (
    <div style={{ fontFamily: "'Cairo', sans-serif" }}>
      <h1 style={{ color: "#30684b", marginBottom: 16 }}>البيكسل والتسويق</h1>
      <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>
        اختر المنصة — ستظهر حقول مناسبة (معرف بيكسل، GTM، إلخ). يمكنك أيضاً لصق كود كامل يدوياً عند اختيار «كود مخصص».
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
      {snippets.map((s, i) => (
        <div
          key={i}
          style={{
            marginBottom: 24,
            padding: 20,
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #e0e0e0",
          }}
        >
          <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>اسم المقطع</label>
          <input
            value={s.name}
            onChange={(e) => updateSnippet(i, { name: e.target.value })}
            style={{
              display: "block",
              width: "100%",
              marginBottom: 16,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />

          <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>المنصة</label>
          <select
            value={s.platform}
            onChange={(e) => {
              const platform = e.target.value;
              updateSnippet(i, {
                platform,
                presetFields: {},
                code: platform === "custom" ? s.code : "",
              });
            }}
            style={{
              display: "block",
              width: "100%",
              maxWidth: 420,
              marginBottom: 16,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          >
            {PLATFORM_OPTIONS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>

          {getPresetFieldDefs(s.platform).map((def) => (
            <div key={def.key} style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>{def.label}</label>
              <input
                dir="ltr"
                style={{
                  width: "100%",
                  maxWidth: 480,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                  textAlign: "left",
                }}
                placeholder={def.placeholder}
                value={s.presetFields?.[def.key] ?? ""}
                onChange={(e) => updatePresetField(i, def.key, e.target.value)}
              />
            </div>
          ))}

          {s.platform !== "custom" && (
            <button
              type="button"
              onClick={() => applyGeneratedCode(i)}
              style={{
                marginBottom: 16,
                padding: "10px 18px",
                background: "#e8f5e9",
                border: "1px solid #30684b",
                color: "#30684b",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              توليد / تحديث الكود من المعرفات
            </button>
          )}

          <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>الموضع في الصفحة</label>
          <select
            value={s.placement}
            onChange={(e) => updateSnippet(i, { placement: e.target.value })}
            style={{ display: "block", marginBottom: 16, padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          >
            <option value="head">داخل &lt;head&gt;</option>
            <option value="bodyEnd">قبل إغلاق &lt;body&gt;</option>
          </select>

          <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>
            {s.platform === "custom" ? "الكود (HTML / Script)" : "الكود الناتج (يمكنك تعديله يدوياً بعد التوليد)"}
          </label>
          <textarea
            value={s.code}
            onChange={(e) => updateSnippet(i, { code: e.target.value })}
            spellCheck={false}
            style={{
              width: "100%",
              minHeight: s.platform === "custom" ? 200 : 140,
              fontFamily: "ui-monospace, monospace",
              fontSize: 12,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              direction: "ltr",
              textAlign: "left",
              boxSizing: "border-box",
            }}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setSnippets((prev) => [...prev, emptySnippet(prev.length)])}
        style={{
          marginLeft: 12,
          padding: "10px 16px",
          background: "#eee",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        + مقطع جديد
      </button>
      <button
        type="button"
        onClick={save}
        disabled={saving}
        style={{
          padding: "12px 28px",
          background: "#30684b",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 800,
          cursor: saving ? "wait" : "pointer",
        }}
      >
        {saving ? "..." : "حفظ"}
      </button>
    </div>
  );
}
