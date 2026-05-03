import { useState } from "react";
import { useReveal } from "../../hooks/useReveal";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

export default function PlaceCard({ img, title, delay }) {
  const [ref, visible] = useReveal(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        borderRadius: 15,
        overflow: "hidden",
        aspectRatio: "1/1",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "scale(1) translateY(0)"
          : "scale(0.9) translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={resolveMediaUrl(img)}
        alt={title}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.15) rotate(2deg)" : "scale(1)",
          transition: "transform 0.6s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: hovered
            ? "linear-gradient(to top, rgba(193,158,102,0.95) 0%, rgba(48,104,75,0.5) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(48,104,75,0.9) 0%, rgba(48,104,75,0.4) 40%, transparent 100%)",
          display: "flex",
          alignItems: "flex-end",
          padding: "20px",
          transition: "background 0.4s ease",
        }}
      >
        <h3
          style={{
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: 800,
            margin: 0,
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "transform 0.4s ease",
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
