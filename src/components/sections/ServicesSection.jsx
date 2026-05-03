import { useReveal } from "../../hooks/useReveal";
import ServiceCard from "../cards/ServiceCard";
import { useSiteContent } from "../../context/SiteContentContext.jsx";

export default function ServicesSection() {
  const { payload } = useSiteContent();
  const [ref, visible] = useReveal();
  const services = payload.services;
  const title = payload.servicesTitle;

  return (
    <section id="services" style={{ padding: "60px 20px", background: "#f8f5f0" }}>
      <h2
        ref={ref}
        className="section-reveal"
        style={{
          textAlign: "center",
          color: "#30684b",
          fontSize: "2rem",
          fontWeight: 800,
          marginBottom: 40,
          ...(visible ? { opacity: 1, transform: "none" } : {}),
        }}
      >
        {title}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 30,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {services.map((s, i) => (
          <ServiceCard key={s.title} {...s} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}
