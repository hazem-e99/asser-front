import { useState, useEffect, useRef } from "react";

// ========== STYLES ==========
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --green-dark: #14322d;
    --green-mid: #0c1f1c;
    --green-main: #30684b;
    --gold-light: #dccdae;
    --gold-main: #c19e66;
    --gold-bright: #e5b83b;
    --blue-light: #7bbed7;
    --white: #ffffff;
    --text-dark: #555555;
  }

  body { font-family: 'Cairo', sans-serif; direction: rtl; background: #f8f5f0; overflow-x: hidden; }
  
  html { scroll-behavior: smooth; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.88) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes bgPan {
    from { background-position: 0 0; }
    to { background-position: 100px 100px; }
  }
  @keyframes starsIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .section-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .section-reveal.visible { opacity: 1; transform: translateY(0); }

  .card-reveal { opacity: 0; transform: translateY(40px) scale(0.96); transition: opacity 0.5s ease, transform 0.5s ease; }
  .card-reveal.visible { opacity: 1; transform: translateY(0) scale(1); }

  .place-reveal { opacity: 0; transform: scale(0.9) translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .place-reveal.visible { opacity: 1; transform: scale(1) translateY(0); }
`;

// ========== HOOK: Intersection Observer ==========
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold, rootMargin: "50px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ========== NAVBAR ==========
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#services", label: "الرحلات" },
    { href: "#tours", label: "الجولات والتجارب" },
    { href: "#bikes", label: "الدراجات" },
    { href: "#about", label: "من أكون ؟" },
    { href: "#reviews", label: "تقييمات عملائنا" },
  ];
  return (
    <header style={{
      background: "linear-gradient(to left, #14322d, #0c1f1c)",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      position: "sticky", top: 0, zIndex: 1000, width: "100%"
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        maxWidth: 1200, margin: "0 auto", padding: "10px 20px"
      }}>
        <a href="#">
          <img src="https://asser.online/wp-content/uploads/2026/04/Untitled-design-44.png"
            alt="عبد الله العسيري" style={{ maxHeight: 70, width: "auto" }} />
        </a>

        <button onClick={() => setOpen(!open)} style={{
          display: "none", background: "none", border: "none",
          color: "#fff", fontSize: 24, cursor: "pointer"
        }} className="mobile-toggle">
          <i className={`fas ${open ? "fa-times" : "fa-bars"}`}></i>
        </button>

        <nav style={{ display: "flex", gap: 25 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              color: "#fff", textDecoration: "none", fontSize: 16,
              fontWeight: 600, transition: "color 0.3s",
              fontFamily: "'Cairo', sans-serif"
            }}
              onMouseEnter={e => e.target.style.color = "#e5b83b"}
              onMouseLeave={e => e.target.style.color = "#fff"}
            >{l.label}</a>
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

// ========== HERO BANNER ==========
function HeroBanner() {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <img src="https://asser.online/wp-content/uploads/2026/04/1111.jpg.jpeg"
        alt="عسير" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
    </div>
  );
}

// ========== SERVICES SECTION ==========
const services = [
  { img: "https://asser.online/wp-content/uploads/2026/04/D1.jpg", title: "آثار ومعالم سياحية", desc: "عيش أجواء الماضي في عسير مع تاريخ يحكي لك قصص ما تنسى." },
  { img: "https://asser.online/wp-content/uploads/2026/04/D2.jpg", title: "إقامة مميزة بطابع العصر أو الريف", desc: "عيش تجربة سكن مختلفة تمامًا مع راحة وفخامة تناسب كل الأذواق." },
  { img: "https://asser.online/wp-content/uploads/2026/04/D3.jpg", title: "وجهات طبيعية", desc: "وجهات هادية لعشاق الصفاء والاسترخاء مع طبيعة ساحرة تخطف الأنفاس." },
  { img: "https://asser.online/wp-content/uploads/2026/04/D4.jpg", title: "أنشطة وجولات", desc: "فعاليات ممتعة لكل يوم في رحلتك و أنشطة تناسب كل اهتماماتك." },
  { img: "https://asser.online/wp-content/uploads/2026/04/D5.jpg", title: "استقبال وتوديع من وإلى المطار", desc: "نوصلّك ونستقبلك من المطار بكل سلاسة من أول وصولك… إلى لحظة مغادرتك." },
  { img: "https://asser.online/wp-content/uploads/2026/04/D6.jpg", title: "التَنَزَّه والتسوق في عسير", desc: "استمتع بأجواء التَنَزَّه وسط أسواقنا و تذوق الأكلات المحلية في عسيرنا." },
];

function ServiceCard({ img, title, desc, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className="card-reveal" style={{
      transitionDelay: `${delay}ms`,
      ...(visible ? { opacity: 1, transform: "translateY(0) scale(1)" } : {})
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        borderBottom: "4px solid #dccdae",
        transition: "all 0.4s ease", cursor: "default"
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-10px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(48,104,75,0.15)";
          e.currentTarget.style.borderBottomColor = "#c19e66";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.06)";
          e.currentTarget.style.borderBottomColor = "#dccdae";
        }}
      >
        <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
          <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
            onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
            onMouseLeave={e => e.target.style.transform = ""}
          />
        </div>
        <div style={{ padding: "25px 20px" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.3rem", color: "#30684b", marginBottom: 12 }}>{title}</h3>
          <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 1.7, margin: 0 }}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="services" style={{ padding: "60px 20px", background: "#f8f5f0" }}>
      <h2 ref={ref} className="section-reveal" style={{
        textAlign: "center", color: "#30684b", fontSize: "2rem",
        fontWeight: 800, marginBottom: 40,
        ...(visible ? { opacity: 1, transform: "none" } : {})
      }}>خدماتنا</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 30, maxWidth: 1200, margin: "0 auto"
      }}>
        {services.map((s, i) => <ServiceCard key={i} {...s} delay={i * 100} />)}
      </div>
    </section>
  );
}

// ========== DIVIDER ==========
function Divider() {
  return <div style={{ height: 2, background: "linear-gradient(to right, transparent, #c19e66, transparent)", margin: "20px auto", maxWidth: 600 }} />;
}

// ========== TOURS VIDEO HERO ==========
function ToursHero() {
  return (
    <div style={{
      position: "relative", background: "#0c1f1c",
      padding: "80px 20px", textAlign: "center", overflow: "hidden"
    }}>
      <video autoPlay muted playsInline loop style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        objectFit: "cover", opacity: 0.5
      }}>
        <source src="https://asser.online/wp-content/uploads/2026/04/7226860_Crazy_Numbers_1280x720.mp4" type="video/mp4" />
      </video>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block", padding: "30px 40px",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
          borderRadius: 15, border: "1px solid rgba(220,205,174,0.2)"
        }}>
          <h2 style={{
            fontWeight: 700, fontSize: "2.8rem", margin: 0,
            background: "linear-gradient(to left, #dccdae, #c19e66, #7bbed7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            lineHeight: 1.4
          }}>الجولات والتجارب المميزة في عسير</h2>
        </div>
      </div>
      <style>{`@media(max-width:768px){ h2 { font-size: 1.8rem !important; } }`}</style>
    </div>
  );
}

// ========== PLACES GRID ==========
const places = [
  { img: "https://asser.online/wp-content/uploads/2026/04/1_20260406_035353_٠٠٠٠-scaled.png", title: "حديقة الخيال" },
  { img: "https://asser.online/wp-content/uploads/2026/04/2_20260406_035354_٠٠٠١-scaled.png", title: "ممشي الضباب" },
  { img: "https://asser.online/wp-content/uploads/2026/04/3_20260406_035355_٠٠٠٢-scaled.png", title: "بني مازن" },
  { img: "https://asser.online/wp-content/uploads/2026/04/4_20260406_035357_٠٠٠٣-scaled.png", title: "منتزه دلغان" },
  { img: "https://asser.online/wp-content/uploads/2026/04/13_20260406_035417_٠٠١٢-scaled.png", title: "مزارع فراولة بني مازن" },
  { img: "https://asser.online/wp-content/uploads/2026/04/15_20260406_035422_٠٠١٤-scaled.png", title: "هايكنج" },
  { img: "https://asser.online/wp-content/uploads/2026/04/14_20260406_035420_٠٠١٣-scaled.png", title: "كوخ العسل" },
  { img: "https://asser.online/wp-content/uploads/2026/04/9_20260406_035405_٠٠٠٨-scaled.png", title: "قرية أبو سراح التاريخية" },
  { img: "https://asser.online/wp-content/uploads/2026/04/IMG_20260411_180239_611.jpg.jpeg", title: "منتزه الحبلة" },
  { img: "https://asser.online/wp-content/uploads/2026/04/8_20260406_035403_٠٠٠٧-scaled.png", title: "متحف (الراقدي)" },
  { img: "https://asser.online/wp-content/uploads/2026/04/11_20260406_035411_٠٠١٠-scaled.png", title: "ملاهي المطار" },
  { img: "https://asser.online/wp-content/uploads/2026/04/7_20260406_035401_٠٠٠٦-scaled.png", title: "متحف القط العسيري" },
  { img: "https://asser.online/wp-content/uploads/2026/04/IMG_20260411_180221_737.jpg.jpeg", title: "المدينة العالية" },
  { img: "https://asser.online/wp-content/uploads/2026/04/20_20260406_035440_٠٠١٩-scaled.png", title: "مطعم باب التراث" },
  { img: "https://asser.online/wp-content/uploads/2026/04/17_20260406_035429_٠٠١٦-scaled.png", title: "مطعم Sky village" },
  { img: "https://asser.online/wp-content/uploads/2026/04/16_20260406_035426_٠٠١٥-scaled.png", title: "الراشد مول" },
  { img: "https://asser.online/wp-content/uploads/2026/04/22_20260406_070115_٠٠٢١-scaled.png", title: "مطعم شندل" },
  { img: "https://asser.online/wp-content/uploads/2026/04/19_20260406_035437_٠٠١٨-scaled.png", title: "مطعم فلق" },
  { img: "https://asser.online/wp-content/uploads/2026/04/IMG_20260411_180543_221.jpg.jpeg", title: "مطعم الجورى" },
  { img: "https://asser.online/wp-content/uploads/2026/04/IMG_20260411_180536_140.jpg.jpeg", title: "مطعم سدف" },
  { img: "https://asser.online/wp-content/uploads/2026/04/IMG_20260411_180534_451.jpg.jpeg", title: "فندق بودل" },
];

function PlaceCard({ img, title, delay }) {
  const [ref, visible] = useReveal(0.08);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} style={{
      position: "relative", borderRadius: 15, overflow: "hidden",
      aspectRatio: "1/1", boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      cursor: "default"
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={img} alt={title} loading="lazy" style={{
        width: "100%", height: "100%", objectFit: "cover",
        transform: hovered ? "scale(1.15) rotate(2deg)" : "scale(1)",
        transition: "transform 0.6s ease"
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "100%",
        background: hovered
          ? "linear-gradient(to top, rgba(193,158,102,0.95) 0%, rgba(48,104,75,0.5) 50%, transparent 100%)"
          : "linear-gradient(to top, rgba(48,104,75,0.9) 0%, rgba(48,104,75,0.4) 40%, transparent 100%)",
        display: "flex", alignItems: "flex-end", padding: "20px",
        transition: "background 0.4s ease"
      }}>
        <h3 style={{
          color: "#fff", fontSize: "1.2rem", fontWeight: 800, margin: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          transform: hovered ? "translateY(0)" : "translateY(10px)",
          transition: "transform 0.4s ease"
        }}>{title}</h3>
      </div>
    </div>
  );
}

function PlacesSection() {
  return (
    <section id="tours" style={{ padding: "20px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 20
      }}>
        {places.map((p, i) => <PlaceCard key={i} {...p} delay={(i % 4) * 100} />)}
      </div>
    </section>
  );
}

// ========== CAROUSEL ==========
function Carousel({ images, id }) {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const visible = 3;
  const max = images.length - visible;

  const updateSlider = (newIdx) => {
    setIdx(newIdx);
    if (trackRef.current) {
      const slideWidth = trackRef.current.children[0]?.getBoundingClientRect().width || 0;
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
    <div style={{ position: "relative", maxWidth: 1200, margin: "40px auto", direction: "ltr", padding: "0 50px" }}>
      <button onClick={prev} style={arrowBtnStyle("left")}
        onMouseEnter={e => e.currentTarget.style.background = "#c19e66"}
        onMouseLeave={e => e.currentTarget.style.background = "#30684b"}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button onClick={next} style={arrowBtnStyle("right")}
        onMouseEnter={e => e.currentTarget.style.background = "#c19e66"}
        onMouseLeave={e => e.currentTarget.style.background = "#30684b"}>
        <i className="fas fa-chevron-right"></i>
      </button>
      <div style={{ overflow: "hidden", borderRadius: 15 }}>
        <div ref={trackRef} style={{ display: "flex", transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
          {images.map((src, i) => (
            <div key={i} style={{ flex: "0 0 33.3333%", padding: "0 10px", boxSizing: "border-box" }}>
              <img src={src} alt={`صورة ${i + 1}`} style={{
                width: "100%", aspectRatio: "1/1", objectFit: "cover",
                borderRadius: 15, border: "2px solid #c19e66",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease"
              }}
                onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.target.style.transform = ""}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const arrowBtnStyle = (side) => ({
  position: "absolute", top: "50%", transform: "translateY(-50%)",
  [side]: 0, width: 45, height: 45, background: "#30684b",
  color: "#fff", border: "none", borderRadius: "50%",
  cursor: "pointer", zIndex: 10, display: "flex",
  alignItems: "center", justifyContent: "center",
  fontSize: "1.2rem", boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease"
});

const bikeImages = [
  "https://asser.online/wp-content/uploads/2026/04/Gemini_Generated_Image_4y8zpl4y8zpl4y8z-1-1.png",
  "https://asser.online/wp-content/uploads/2026/04/Gemini_Generated_Image_3eeubi3eeubi3eeu.png",
  "https://asser.online/wp-content/uploads/2026/04/Gemini_Generated_Image_hwmzgahwmzgahwmz.png",
  "https://asser.online/wp-content/uploads/2026/04/Gemini_Generated_Image_4y8zpl4y8zpl4y8z-1-1.png",
  "https://asser.online/wp-content/uploads/2026/04/Gemini_Generated_Image_3eeubi3eeubi3eeu.png",
  "https://asser.online/wp-content/uploads/2026/04/Gemini_Generated_Image_hwmzgahwmzgahwmz.png",
];

function BikesSection() {
  return (
    <section id="bikes" style={{ padding: "40px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img src="https://asser.online/wp-content/uploads/2026/04/2.jpg"
          alt="الدراجات" style={{ width: "100%", maxHeight: 400, objectFit: "cover" }} />
      </div>
      <Carousel images={bikeImages} id="bikes-slider" />
    </section>
  );
}

// ========== ABOUT SECTION ==========
const reasons = [
  { icon: "fa-certificate", bold: "مرشد معتمد وذو خبرة:", text: " خبرة محلية قوية ومعرفة دقيقة بالمواقع السياحية." },
  { icon: "fa-map-marked-alt", bold: "جولات شخصية ومتكاملة:", text: " تجربة تبدأ من الاستقبال وحتى التوديع، مع جميع التفاصيل المصممة لك." },
  { icon: "fa-hiking", bold: "تنوع الأنشطة:", text: " طبيعة، أسواق، فعاليات، مزارع، متاحف، مناطق مرتفعة وضبابية." },
  { icon: "fa-calendar-check", bold: "مرونة كاملة:", text: " يمكن تعديل الرحلة حسب رغبتك وعدد الأيام." },
  { icon: "fa-heart", bold: "تجربة محلية حقيقية:", text: " دمج الثقافة والعادات المحلية في كل جولة." },
];

function AboutSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="about" style={{
      background: "#dccdae", borderRadius: 20, margin: "40px 20px",
      padding: "80px 20px", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        backgroundImage: "repeating-linear-gradient(45deg, #dccdae, #dccdae 10px, #fff 10px, #fff 20px)",
        opacity: 0.08, animation: "bgPan 20s linear infinite", zIndex: 0
      }} />
      <div ref={ref} style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 50, maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1,
        flexWrap: "wrap"
      }}>
        {/* Info Column */}
        <div style={{ flex: "2 1 600px", color: "#30684b" }}>
          <h1 style={{ fontWeight: 800, fontSize: "3rem", color: "#30684b", marginBottom: 10 }}>عبد الله العسيري</h1>
          <h2 style={{ fontWeight: 700, fontSize: "1.8rem", color: "#c19e66", marginBottom: 25 }}>مرشد سياحي مرخص</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 20 }}>
            مرشد سياحي معتمد في منطقة عسير – أبها. أقدّم تجربة سياحية شخصية متكاملة، تجمع بين الطبيعة، الثقافة، والترفيه، بدءًا من استقبالك وحتى توديعك بأجمل اللحظات.
          </p>
          <h3 style={{ fontWeight: 800, fontSize: "1.8rem", color: "#30684b", margin: "30px 0 15px" }}>رؤيتي</h3>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 20 }}>
            أن أقدّم لكل سائح تجربة أصيلة في عسير، بحيث يتمكن من اكتشاف جمال الطبيعة والريف والثقافة المحلية بطريقة ممتعة وآمنة ومريحة.
          </p>
          <h3 style={{ fontWeight: 800, fontSize: "1.8rem", color: "#30684b", margin: "30px 0 15px" }}>لماذا تختارني</h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 15 }}>
            {reasons.map((r, i) => (
              <li key={i} style={{
                display: "flex", alignItems: "center", gap: 15,
                background: "#fff", padding: 15, borderRadius: 12,
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${(i + 1) * 0.1}s, transform 0.5s ease ${(i + 1) * 0.1}s`
              }}>
                <div style={{ fontSize: "1.8rem", color: "#c19e66", width: 50, textAlign: "center" }}>
                  <i className={`fas ${r.icon}`}></i>
                </div>
                <div style={{ fontSize: "1.1rem" }}><strong>{r.bold}</strong>{r.text}</div>
              </li>
            ))}
          </ul>
        </div>
        {/* Photo Column */}
        <div style={{ flex: "1 1 300px", maxWidth: 400, textAlign: "center" }}>
          <div style={{
            borderRadius: "50% / 15px", overflow: "hidden",
            boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
            border: "10px solid #c19e66"
          }}>
            <img src="https://asser.online/wp-content/uploads/2026/04/ألقِ-نظرة-على-تصميمي-من-Canva-scaled.png"
              alt="عبد الله العسيري" style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== REVIEWS ==========
const reviewsImages = [
  "https://asser.online/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-7.51.28-PM.jpeg",
  "https://asser.online/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-7.51.29-PM.jpeg",
  "https://asser.online/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-7.51.28-PM.jpeg",
  "https://asser.online/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-7.51.29-PM.jpeg",
  "https://asser.online/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-7.51.28-PM.jpeg",
  "https://asser.online/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-7.51.29-PM.jpeg",
];

const staticReviews = [
  {
    text: '"تجربة أكثر من رائعة مع أفضل مرشد سياحي في عسير! الجدول كان منظم جداً واستمتعنا بزيارة المدينة العالية ومتحف الراقدي. وتجربة العشاء في مطعم الجورى كانت مسك الختام، والإقامة في فندق بودل كانت ممتازة. شكراً على حسن الاستقبال والترتيب المتميز."',
    name: "فيصل القحطاني", from: "سائح من الرياض", initial: "ف"
  },
  {
    text: '"رحلة لا تُنسى بصراحة! المرشد السياحي كان قمة في الرقي وملم بكل تفاصيل وتاريخ المنطقة. ممشى الضباب وحديقة الخيال كانوا في قمة الروعة. حبيت جداً تنوع الأماكن واختيار مطعم سدف للغداء. أنصح الجميع بالتعامل معه وتجربة هذه الرحلة."',
    name: "نورة الشهري", from: "سائحة من جدة", initial: "ن"
  },
];

function Stars() {
  return (
    <div style={{ color: "#ffc107", marginBottom: 15, fontSize: "1.1rem" }}>
      {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
    </div>
  );
}

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setName(""); setText(""); setRating(0);
  };

  return (
    <div style={{
      background: "#f9fbf9", borderRadius: 15, padding: 30,
      border: "1px solid #e0e0e0", maxWidth: 700, margin: "0 auto"
    }}>
      <h3 style={{ color: "#30684b", marginBottom: 5, fontWeight: 800 }}>شاركنا تجربتك!</h3>
      <p style={{ color: "#666", marginBottom: 20, fontSize: "0.95rem" }}>
        يسعدنا سماع رأيك في جولتك السياحية والأماكن التي قمت بزيارتها.
      </p>
      {submitted && (
        <div style={{ background: "#e8f5e9", color: "#30684b", padding: "12px 20px", borderRadius: 8, marginBottom: 20, fontWeight: 600 }}>
          ✅ شكراً لك! تم إرسال تقييمك بنجاح للمراجعة.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 8, color: "#333", fontWeight: 600 }}>تقييمك للمرشد والرحلة:</label>
          <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "flex-end", fontSize: "1.8rem", color: "#dcdcdc" }}>
            {[5, 4, 3, 2, 1].map(v => (
              <i key={v} className="fas fa-star" onClick={() => setRating(v)}
                style={{ padding: "0 3px", cursor: "pointer", color: v <= rating ? "#ffc107" : "#dcdcdc", transition: "color 0.2s" }}
                onMouseEnter={e => { for (let i = v; i <= 5; i++) { } e.target.style.color = "#ffc107"; }}
                onMouseLeave={e => e.target.style.color = v <= rating ? "#ffc107" : "#dcdcdc"}
              />
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 8, color: "#333", fontWeight: 600 }}>الاسم الكريم</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required
            placeholder="اكتب اسمك هنا..." style={inputStyle} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 8, color: "#333", fontWeight: 600 }}>رأيك وتجربتك</label>
          <textarea rows={4} value={text} onChange={e => setText(e.target.value)} required
            placeholder="حدثنا عن الأماكن التي زرتها ورأيك في التنظيم..." style={{ ...inputStyle, height: "auto", resize: "vertical" }} />
        </div>
        <button type="submit" style={{
          background: "#30684b", color: "#fff", border: "none",
          padding: "12px 30px", borderRadius: 8, fontSize: "1.1rem",
          fontWeight: 800, fontFamily: "'Cairo', sans-serif",
          cursor: "pointer", width: "100%", transition: "background 0.3s"
        }}
          onMouseEnter={e => e.target.style.background = "#c19e66"}
          onMouseLeave={e => e.target.style.background = "#30684b"}
        >إرسال التقييم</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "12px 15px", border: "1px solid #ccc",
  borderRadius: 8, fontFamily: "'Cairo', sans-serif", fontSize: "1rem",
  boxSizing: "border-box", transition: "border-color 0.3s",
  outline: "none"
};

function ReviewsSection() {
  return (
    <section id="reviews" style={{ padding: "40px 20px" }}>
      <h2 style={{ textAlign: "center", color: "#30684b", fontSize: "2rem", fontWeight: 800, marginBottom: 10 }}>آراء عملائنا الكرام</h2>
      <Carousel images={reviewsImages} id="reviews-slider" />

      <div style={{ maxWidth: 1200, margin: "60px auto 40px", padding: "0 20px" }}>
        <h2 style={{
          textAlign: "center", color: "#30684b", fontSize: "2rem",
          fontWeight: 800, marginBottom: 40, position: "relative"
        }}>
          تقييمات عملائنا الجدد
          <div style={{
            position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
            width: 60, height: 4, background: "#c19e66", borderRadius: 2
          }} />
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30, marginBottom: 50 }}>
          {staticReviews.map((r, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 15, padding: 25,
              boxShadow: "0 5px 20px rgba(0,0,0,0.05)", borderTop: "5px solid #c19e66",
              transition: "transform 0.3s ease"
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={e => e.currentTarget.style.transform = ""}
            >
              <Stars />
              <p style={{ color: "#555", fontSize: "1rem", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>{r.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <div style={{
                  width: 50, height: 50, background: "#30684b", color: "#fff",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "1.2rem", fontWeight: "bold"
                }}>{r.initial}</div>
                <div>
                  <h4 style={{ margin: 0, color: "#30684b", fontSize: "1.1rem", fontWeight: 800 }}>{r.name}</h4>
                  <span style={{ fontSize: "0.85rem", color: "#888" }}>{r.from}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ReviewForm />
      </div>
    </section>
  );
}

// ========== FOOTER ==========
function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(to left, #14322d, #0c1f1c)",
      color: "#fff", fontFamily: "'Cairo', sans-serif",
      padding: "50px 20px", marginTop: 50
    }}>
      <div style={{
        display: "flex", flexWrap: "wrap", justifyContent: "space-between",
        alignItems: "center", gap: 30, maxWidth: 1200, margin: "0 auto"
      }}>
        {/* Logo */}
        <div style={{ flex: "1.2", display: "flex", justifyContent: "flex-start" }}>
          <img src="https://asser.online/wp-content/uploads/2026/04/Untitled-design-44.png"
            alt="عبد الله العسيري" style={{
              maxWidth: 350, width: "100%", borderRadius: 10,
              WebkitMaskImage: "radial-gradient(circle, black 75%, transparent 100%)",
              maskImage: "radial-gradient(circle, black 75%, transparent 100%)"
            }} />
        </div>
        {/* Services */}
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 25, color: "#e5b83b" }}>الخدمات</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["جولات سياحية يومية في أبها - عسير", "تنظيم الرحلات للعائلات والأفراد", "تأجير سيارات ودراجات لمرافقة الرحلات"].map((s, i) => (
              <li key={i} style={{ marginBottom: 20, fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", gap: 12 }}>
                <i className="fas fa-check-circle" style={{ color: "#e5b83b", fontSize: 18 }}></i> {s}
              </li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 25, color: "#e5b83b" }}>تواصل معنا</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
            <i className="fab fa-whatsapp" style={{ fontSize: 20 }}></i>
            واتس آب: <span dir="ltr">+966 53 536 9779</span>
          </div>
          <div style={{ display: "flex", gap: 15, marginBottom: 25 }}>
            {[
              { href: "https://www.instagram.com/abdullah_alasiri_abha", icon: "fa-instagram" },
              { href: "https://www.tiktok.com/@abdullah_asiri_tours", icon: "fa-tiktok" },
              { href: "https://www.snapchat.com/add/alfaris9779", icon: "fa-snapchat-ghost" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 45, height: 45, background: "rgba(255,255,255,0.05)",
                color: "#fff", borderRadius: "50%", textDecoration: "none",
                fontSize: 20, border: "1px solid rgba(255,255,255,0.2)",
                transition: "all 0.3s ease"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e5b83b"; e.currentTarget.style.color = "#0c1f1c"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
              ><i className={`fab ${s.icon}`}></i></a>
            ))}
          </div>
          <a href="https://maps.app.goo.gl/L9uNovdtBPAHZUSG9" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 20px", background: "transparent", color: "#fff",
            borderRadius: 8, border: "1px solid rgba(255,255,255,0.4)",
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            transition: "all 0.3s ease", fontFamily: "'Cairo', sans-serif"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
          >
            الموقع على الخريطة <i className="fas fa-map-marker-alt" style={{ marginRight: 8 }}></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

// ========== WHATSAPP BUTTON ==========
function WhatsAppBtn() {
  return (
    <a href="https://wa.me/966535369779" target="_blank" rel="noreferrer" style={{
      position: "fixed", bottom: 30, right: 30, background: "#25d366",
      color: "#fff", width: 60, height: 60, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 35, textDecoration: "none",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)", zIndex: 9999,
      transition: "all 0.3s ease"
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "#1ebe57"; e.currentTarget.style.transform = "scale(1.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "#25d366"; e.currentTarget.style.transform = ""; }}
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}

// ========== SCROLL TO TOP ==========
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
      position: "fixed", bottom: 100, right: 30, background: "#30684b",
      color: "#fff", width: 45, height: 45, borderRadius: 8,
      border: "none", cursor: "pointer", fontSize: 18, zIndex: 9999,
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)", transition: "all 0.3s"
    }}
      onMouseEnter={e => e.currentTarget.style.background = "#c19e66"}
      onMouseLeave={e => e.currentTarget.style.background = "#30684b"}
    >↑</button>
  );
}

// ========== APP ==========
export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <Navbar />
      <HeroBanner />
      <ServicesSection />
      <Divider />
      <ToursHero />
      <PlacesSection />
      <Divider />
      <BikesSection />
      <Divider />
      <AboutSection />
      <Divider />
      <ReviewsSection />
      <Footer />
      <WhatsAppBtn />
      <ScrollToTop />
    </>
  );
}
