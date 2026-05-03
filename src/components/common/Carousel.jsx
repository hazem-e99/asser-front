import { useState, useEffect, useRef } from "react";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

const arrowBtnStyle = (side) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  [side]: 0,
  width: 45,
  height: 45,
  background: "#30684b",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease",
});

export default function Carousel({ images }) {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const visible = 3;
  const max = Math.max(0, images.length - visible);

  const updateSlider = (newIdx) => {
    setIdx(newIdx);
    if (trackRef.current) {
      const slideWidth =
        trackRef.current.children[0]?.getBoundingClientRect().width || 0;
      trackRef.current.style.transform = `translateX(-${newIdx * slideWidth}px)`;
    }
  };

  const next = () => updateSlider(idx < max ? idx + 1 : 0);
  const prev = () => updateSlider(idx > 0 ? idx - 1 : max);

  useEffect(() => {
    const handleResize = () => updateSlider(0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        maxWidth: 1200,
        margin: "40px auto",
        direction: "ltr",
        padding: "0 50px",
      }}
    >
      <button
        type="button"
        onClick={prev}
        style={arrowBtnStyle("left")}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#c19e66")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#30684b")}
        aria-label="السابق"
      >
        <i className="fas fa-chevron-left" />
      </button>
      <button
        type="button"
        onClick={next}
        style={arrowBtnStyle("right")}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#c19e66")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#30684b")}
        aria-label="التالي"
      >
        <i className="fas fa-chevron-right" />
      </button>
      <div style={{ overflow: "hidden", borderRadius: 15 }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 33.3333%",
                padding: "0 10px",
                boxSizing: "border-box",
              }}
            >
              <img
                src={resolveMediaUrl(src)}
                alt={`صورة ${i + 1}`}
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: 15,
                  border: "2px solid #c19e66",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.target.style.transform = "")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
