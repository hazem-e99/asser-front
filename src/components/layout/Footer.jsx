import { useSiteContent } from "../../context/SiteContentContext.jsx";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

export default function Footer() {
  const { payload } = useSiteContent();
  const f = payload.footer;
  const logoUrl = payload.assets?.logoUrl;

  return (
    <footer style={{ background: "linear-gradient(to left, #14322d, #0c1f1c)", color: "#fff", fontFamily: "'Cairo', sans-serif", marginTop: 50 }}>
      <style>{`
        /* ── Desktop ── */
        .ft-wrap { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 30px; max-width: 1200px; margin: 0 auto; padding: 50px 20px; }
        .ft-logo { flex: 1.2; display: flex; justify-content: flex-start; }
        .ft-logo img { max-width: 350px; width: 100%; border-radius: 10px; -webkit-mask-image: radial-gradient(circle, black 75%, transparent 100%); mask-image: radial-gradient(circle, black 75%, transparent 100%); }
        .ft-col { flex: 1; min-width: 250px; }
        .ft-social { display: flex; gap: 15px; margin-bottom: 20px; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .ft-wrap { flex-direction: column; align-items: stretch; padding: 40px 20px; gap: 35px; }
          .ft-logo { justify-content: center; }
          .ft-logo img { max-width: 240px; }
          .ft-col { width: 100%; min-width: unset; }
          .ft-col h3 { text-align: right; }
          .ft-col ul { padding: 0; }
          .ft-item { justify-content: flex-start !important; }
          .ft-whatsapp { justify-content: flex-start !important; }
          .ft-social { justify-content: center; }
          .ft-maps { display: flex !important; justify-content: center; margin-top: 5px; }
          .ft-maps a { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="ft-wrap">
        {/* Logo */}
        <div className="ft-logo">
          <img src={resolveMediaUrl(logoUrl)} alt="عبد الله العسيري" />
        </div>

        {/* Services */}
        <div className="ft-col">
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: "#e5b83b" }}>
            {f.servicesColumnTitle}
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {f.footerServices.map((s, i) => (
              <li
                key={i}
                className="ft-item"
                style={{ marginBottom: 18, fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 12 }}
              >
                {s}
                <i className="fas fa-check-circle" style={{ color: "#e5b83b", fontSize: 18, flexShrink: 0 }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="ft-col">
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: "#e5b83b" }}>
            {f.contactColumnTitle}
          </h3>
          <div
            className="ft-whatsapp"
            style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10, fontSize: 16, fontWeight: 600, marginBottom: 20 }}
          >
            <span dir="ltr">{f.whatsappDisplay}</span>
            {f.whatsappLabel}
            <i className="fab fa-whatsapp" style={{ fontSize: 22, flexShrink: 0 }} />
          </div>
          <div className="ft-social">
            {f.socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, background: "rgba(255,255,255,0.07)", color: "#fff", borderRadius: "50%", textDecoration: "none", fontSize: 19, border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e5b83b"; e.currentTarget.style.color = "#0c1f1c"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; }}
              >
                <i className={`fab ${s.icon}`} />
              </a>
            ))}
          </div>
          <div className="ft-maps">
            <a
              href={f.mapsUrl}
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", background: "transparent", color: "#fff", borderRadius: 8, border: "1px solid rgba(255,255,255,0.4)", textDecoration: "none", fontSize: 15, fontWeight: 600, transition: "all 0.3s ease", fontFamily: "'Cairo', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              <i className="fas fa-map-marker-alt" />
              {f.mapsButtonText}
            </a>
        </div>
        </div>
      </div>
    </footer>
  );
}
