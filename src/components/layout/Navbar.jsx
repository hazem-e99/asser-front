import { useState } from "react";
import { useSiteContent } from "../../context/SiteContentContext.jsx";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

export default function Navbar() {
  const { payload } = useSiteContent();
  const [open, setOpen] = useState(false);
  const links = payload.navLinks;
  const logoUrl = payload.assets?.logoUrl;

  return (
    <header
      style={{
        background: "linear-gradient(to left, #14322d, #0c1f1c)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "10px 20px",
        }}
      >
        <a href="#">
          <img src={resolveMediaUrl(logoUrl)} alt="عبد الله العسيري" style={{ maxHeight: 70, width: "auto" }} />
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 24,
            cursor: "pointer",
          }}
          className="mobile-toggle"
          aria-expanded={open}
          aria-label="القائمة"
        >
          <i className={`fas ${open ? "fa-times" : "fa-bars"}`} />
        </button>

        <nav style={{ display: "flex", gap: 25 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
                transition: "color 0.3s",
                fontFamily: "'Cairo', sans-serif",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#e5b83b")}
              onMouseLeave={(e) => (e.target.style.color = "#fff")}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <style>{`
        @media(max-width:900px){
          header nav { display: ${open ? "flex" : "none"} !important; flex-direction: column;
            position: absolute; top: 100%; right:0; width:100%; background:#0c1f1c;
            padding: 10px 0; gap: 0 !important; box-shadow: 0 10px 15px rgba(0,0,0,0.2); }
          header nav a { padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
