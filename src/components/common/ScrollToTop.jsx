import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: 100,
        right: 30,
        background: "#30684b",
        color: "#fff",
        width: 45,
        height: 45,
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontSize: 18,
        zIndex: 9999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        transition: "all 0.3s",
      }}
      aria-label="العودة لأعلى الصفحة"
      onMouseEnter={(e) => (e.currentTarget.style.background = "#c19e66")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#30684b")}
    >
      ↑
    </button>
  );
}
