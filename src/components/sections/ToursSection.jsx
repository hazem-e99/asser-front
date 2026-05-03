import PlaceCard from "../cards/PlaceCard";
import { useSiteContent } from "../../context/SiteContentContext.jsx";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

function ToursHero({ videoUrl, title }) {
  return (
    <div
      style={{
        position: "relative",
        background: "#0c1f1c",
        padding: "80px 20px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        muted
        playsInline
        loop
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.5,
        }}
      >
        <source src={resolveMediaUrl(videoUrl)} type="video/mp4" />
      </video>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-block",
            padding: "30px 40px",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            borderRadius: 15,
            border: "1px solid rgba(220,205,174,0.2)",
          }}
        >
          <h2
            className="tours-hero-title"
            style={{
              fontWeight: 700,
              fontSize: "2.8rem",
              margin: 0,
              background: "linear-gradient(to left, #dccdae, #c19e66, #7bbed7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.4,
            }}
          >
            {title}
          </h2>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .tours-hero-title { font-size: 1.8rem !important; } }`}</style>
    </div>
  );
}

function PlacesGrid({ places }) {
  return (
    <section id="tours" style={{ padding: "20px", maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {places.map((p, i) => (
          <PlaceCard key={`${p.title}-${i}`} {...p} delay={(i % 4) * 100} />
        ))}
      </div>
    </section>
  );
}

export default function ToursSection() {
  const { payload } = useSiteContent();
  const videoUrl = payload.assets?.toursVideoUrl;
  const title = payload.toursHeroTitle;
  const places = payload.places;

  return (
    <>
      <ToursHero videoUrl={videoUrl} title={title} />
      <PlacesGrid places={places} />
    </>
  );
}
