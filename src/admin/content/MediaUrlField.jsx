import { useState } from "react";
import { apiFetch } from "../../lib/api.js";

const inp = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  boxSizing: "border-box",
  fontFamily: "'Cairo', sans-serif",
};

export default function MediaUrlField({ label, value, onChange, accept = "image/*,video/*" }) {
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");

  async function onFile(e) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setUploadErr("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const data = await apiFetch("/api/upload", { method: "POST", body: fd });
      onChange(data.url);
    } catch (err) {
      setUploadErr(err.message || "فشل الرفع");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#333" }}>{label}</label>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "stretch" }}>
        <input
          style={{ ...inp, flex: "1 1 220px", direction: "ltr", textAlign: "left" }}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="الصق رابط الصورة أو الفيديو…"
        />
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 16px",
            background: uploading ? "#aaa" : "#30684b",
            color: "#fff",
            borderRadius: 8,
            cursor: uploading ? "wait" : "pointer",
            fontWeight: 700,
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
        >
          {uploading ? "جاري الرفع…" : "رفع من الجهاز"}
          <input type="file" accept={accept} disabled={uploading} onChange={onFile} style={{ display: "none" }} />
        </label>
      </div>
      <p style={{ fontSize: 12, color: "#888", marginTop: 6, marginBottom: 0 }}>
        يمكنك إما لصق رابط من الإنترنت أو رفع ملفاً — الرابط الناتج يُحفظ في الموقع.
      </p>
      {uploadErr && (
        <div style={{ color: "#c62828", fontSize: 13, marginTop: 8 }}>{uploadErr}</div>
      )}
    </div>
  );
}
