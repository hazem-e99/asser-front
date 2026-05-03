import { useReveal } from "../../hooks/useReveal";
import { useSiteContent } from "../../context/SiteContentContext.jsx";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

const headingColor = "#2D5A41";
const bodyColor = "#3E6B52";
const narrowBg = "#D9C8A9";

export default function AboutSection() {
  const { payload } = useSiteContent();
  const about = payload.about;
  const missionTitle = about.missionTitle ?? "رسالتي";
  const missionText = about.missionText ?? "";
  const [ref, visible] = useReveal();

  return (
    <section id="about" className="about-section-root">
      <div className="about-section-pattern" aria-hidden />
      <div
        ref={ref}
        className="about-section-inner"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 50,
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
        }}
      >
        <div className="about-section-info" style={{ flex: "2 1 560px", color: bodyColor }}>
          <h1
            className="about-name"
            style={{
              fontWeight: 800,
              fontSize: "3rem",
              color: headingColor,
              marginBottom: 10,
              textAlign: "inherit",
            }}
          >
            {about.name}
          </h1>
          <h2
            className="about-subtitle"
            style={{
              fontWeight: 700,
              fontSize: "1.8rem",
              color: "#c19e66",
              marginBottom: 25,
              textAlign: "inherit",
            }}
          >
            {about.subtitle}
          </h2>
          <p
            className="about-intro"
            style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 24, color: bodyColor }}
          >
            {about.intro}
          </p>

          <h3
            className="about-block-heading"
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              color: headingColor,
              margin: "28px 0 12px",
              textAlign: "inherit",
            }}
          >
            {about.visionTitle}
          </h3>
          <p className="about-block-text" style={{ fontSize: "1rem", lineHeight: 1.65, marginBottom: 28, color: bodyColor }}>
            {about.visionText}
          </p>

          <h3
            className="about-block-heading"
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              color: headingColor,
              margin: "0 0 12px",
              textAlign: "inherit",
            }}
          >
            {missionTitle}
          </h3>
          <p className="about-block-text" style={{ fontSize: "1rem", lineHeight: 1.65, marginBottom: 28, color: bodyColor }}>
            {missionText}
          </p>

          <h3
            className="about-block-heading about-why-heading"
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              color: headingColor,
              margin: "0 0 18px",
              textAlign: "inherit",
            }}
          >
            {about.whyTitle}
          </h3>
          <ul className="about-reasons-list" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {about.reasons.map((r, i) => (
              <li
                key={`${r.icon}-${i}`}
                className="about-reason-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  backgroundColor: "rgb(220 205 174)",
                  padding: 15,
                  borderRadius: 12,
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                  opacity: visible ? undefined : 0,
                  transform: visible ? undefined : "translateY(20px)",
                  animation: visible ? `aboutFadeInUp 0.5s ease ${i * 0.08}s forwards` : "none",
                }}
              >
                <div className="about-reason-icon" style={{ fontSize: "1.85rem", color: "#c19e66", flexShrink: 0 }}>
                  <i className={`fas ${r.icon}`} />
                </div>
                <div style={{ fontSize: "1.05rem", lineHeight: 1.65, color: bodyColor, textAlign: "inherit" }}>
                  <strong style={{ color: headingColor }}>{r.bold}</strong>
                  {r.text}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="about-section-photo" style={{ flex: "1 1 300px", maxWidth: 400, textAlign: "center" }}>
          <div
            style={{
              borderRadius: "50% / 15px",
              overflow: "hidden",
              boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
              border: "10px solid #c19e66",
              borderImage:"linear-gradient(to bottom, #c19e66, #dccdae) 1"
            }}
          >
            <img
              src={resolveMediaUrl(about.aboutPortraitUrl)}
              alt={about.name}
              style={{ width: "100%", height: "auto", objectFit: "cover", display: "block", borderRadius: "50%" }}
            />
          </div>
        </div>
      </div>
      <style>{`
        .about-section-root {
          background: #dccdae;
          border-radius: 20px;
          margin: 40px 20px;
          padding: 80px 20px;
          position: relative;
          overflow: hidden;
        }
        .about-section-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: repeating-linear-gradient(45deg, #dccdae, #dccdae 10px, #fff 10px, #fff 20px);
          opacity: 0.08;
          animation: aboutBgPan 20s linear infinite;
          z-index: 0;
        }
        @keyframes aboutBgPan {
          from { background-position: 0 0; }
          to { background-position: 200px 200px; }
        }
        @keyframes aboutFadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 1025px) {
          .about-section-inner .about-section-info {
            text-align: left;
          }
        }

        @media (max-width: 1024px) {
          .about-section-root {
            background: ${narrowBg};
            margin: 24px 16px;
            padding: 2rem 1rem;
            border-radius: 16px;
          }
          .about-section-pattern {
            display: none;
          }
          .about-section-inner {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1.75rem !important;
            max-width: 560px;
          }
          .about-section-inner .about-section-photo {
            order: 1;
            align-self: center;
            max-width: min(280px, 88vw) !important;
          }
          .about-section-inner .about-section-info {
            text-align: center !important;
            order: 2;
          }
          .about-name {
            font-size: 1.75rem !important;
            margin-bottom: 0.5rem !important;
          }
          .about-subtitle {
            font-size: 1.1rem !important;
            color: #c19e66 !important;
            margin-bottom: 1rem !important;
          }
          .about-intro {
            margin-bottom: 1.75rem !important;
          }
          .about-block-heading {
            font-size: 1.5rem !important;
            margin-top: 0 !important;
            text-align: center !important;
          }
          .about-why-heading {
            margin-bottom: 1rem !important;
          }
          .about-block-text {
            margin-bottom: 2rem !important;
            text-align: center !important;
          }
          .about-reason-card {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            background-color: rgb(220 205 174) !important;
            padding: 15px !important;
            border-radius: 12px !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05) !important;
            border: none !important;
          }
          .about-reason-icon {
            margin-bottom: 0.25rem;
          }
          .about-reasons-list {
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
