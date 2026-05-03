import { useReveal } from "../../hooks/useReveal";
import { useSiteContent } from "../../context/SiteContentContext.jsx";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

export default function AboutSection() {
  const { payload } = useSiteContent();
  const about = payload.about;
  const [ref, visible] = useReveal();

  return (
    <section
      id="about"
      style={{
        background: "#dccdae",
        borderRadius: 20,
        margin: "40px 20px",
        padding: "80px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "repeating-linear-gradient(45deg, #dccdae, #dccdae 10px, #fff 10px, #fff 20px)",
          opacity: 0.08,
          animation: "bgPan 20s linear infinite",
          zIndex: 0,
        }}
      />
      <div
        ref={ref}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "2 1 600px", color: "#30684b" }}>
          <h1 style={{ fontWeight: 800, fontSize: "3rem", color: "#30684b", marginBottom: 10 }}>
            {about.name}
          </h1>
          <h2 style={{ fontWeight: 700, fontSize: "1.8rem", color: "#c19e66", marginBottom: 25 }}>
            {about.subtitle}
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 20 }}>{about.intro}</p>
          <h3 style={{ fontWeight: 800, fontSize: "1.8rem", color: "#30684b", margin: "30px 0 15px" }}>
            {about.visionTitle}
          </h3>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 20 }}>{about.visionText}</p>
          <h3 style={{ fontWeight: 800, fontSize: "1.8rem", color: "#30684b", margin: "30px 0 15px" }}>
            {about.whyTitle}
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 15 }}>
            {about.reasons.map((r, i) => (
              <li
                key={r.icon}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  background: "#fff",
                  padding: 15,
                  borderRadius: 12,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${(i + 1) * 0.1}s, transform 0.5s ease ${(i + 1) * 0.1}s`,
                }}
              >
                <div style={{ fontSize: "1.8rem", color: "#c19e66", width: 50, textAlign: "center" }}>
                  <i className={`fas ${r.icon}`} />
                </div>
                <div style={{ fontSize: "1.1rem" }}>
                  <strong>{r.bold}</strong>
                  {r.text}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: "1 1 300px", maxWidth: 400, textAlign: "center" }}>
          <div
            style={{
              borderRadius: "50% / 15px",
              overflow: "hidden",
              boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
              border: "10px solid #c19e66",
            }}
          >
            <img
              src={resolveMediaUrl(about.aboutPortraitUrl)}
              alt={about.name}
              style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
