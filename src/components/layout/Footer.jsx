import { useSiteContent } from "../../context/SiteContentContext.jsx";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

export default function Footer() {
  const { payload } = useSiteContent();
  const f = payload.footer;
  const logoUrl = payload.assets?.logoUrl;

  return (
    <footer
      style={{
        background: "linear-gradient(to left, #14322d, #0c1f1c)",
        color: "#fff",
        fontFamily: "'Cairo', sans-serif",
        padding: "50px 20px",
        marginTop: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 30,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div style={{ flex: "1.2", display: "flex", justifyContent: "flex-start" }}>
          <img
            src={resolveMediaUrl(logoUrl)}
            alt="عبد الله العسيري"
            style={{
              maxWidth: 350,
              width: "100%",
              borderRadius: 10,
              WebkitMaskImage:
                "radial-gradient(circle, black 75%, transparent 100%)",
              maskImage: "radial-gradient(circle, black 75%, transparent 100%)",
            }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 25, color: "#e5b83b" }}>
            {f.servicesColumnTitle}
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {f.footerServices.map((s, i) => (
              <li
                key={i}
                style={{
                  marginBottom: 20,
                  fontSize: 16,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <i className="fas fa-check-circle" style={{ color: "#e5b83b", fontSize: 18 }} />{" "}
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 25, color: "#e5b83b" }}>
            {f.contactColumnTitle}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            <i className="fab fa-whatsapp" style={{ fontSize: 20 }} />
            {f.whatsappLabel}
            <span dir="ltr">{f.whatsappDisplay}</span>
          </div>
          <div style={{ display: "flex", gap: 15, marginBottom: 25 }}>
            {f.socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45,
                  height: 45,
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  borderRadius: "50%",
                  textDecoration: "none",
                  fontSize: 20,
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e5b83b";
                  e.currentTarget.style.color = "#0c1f1c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                <i className={`fab ${s.icon}`} />
              </a>
            ))}
          </div>
          <a
            href={f.mapsUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              background: "transparent",
              color: "#fff",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.4)",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600,
              transition: "all 0.3s ease",
              fontFamily: "'Cairo', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
            }}
          >
            {f.mapsButtonText} <i className="fas fa-map-marker-alt" style={{ marginRight: 8 }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
