import { useReveal } from "../../hooks/useReveal";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

export default function ServiceCard({ img, title, desc, delay }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className="card-reveal"
      style={{
        transitionDelay: `${delay}ms`,
        ...(visible ? { opacity: 1, transform: "translateY(0) scale(1)" } : {}),
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          borderBottom: "4px solid #dccdae",
          transition: "all 0.4s ease",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(48,104,75,0.15)";
          e.currentTarget.style.borderBottomColor = "#c19e66";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.06)";
          e.currentTarget.style.borderBottomColor = "#dccdae";
        }}
      >
        <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
          <img
            src={resolveMediaUrl(img)}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              display: "block",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
            onMouseLeave={(e) => (e.target.style.transform = "")}
          />
        </div>
        <div className="service-card-body" style={{ padding: "25px 20px" }}>
          <h3
            className="service-card-title"
            style={{
              fontWeight: 700,
              fontSize: "1.3rem",
              color: "#30684b",
              marginBottom: 12,
            }}
          >
            {title}
          </h3>
          <p
            className="service-card-desc"
            style={{
              fontSize: "0.95rem",
              color: "#555",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
