import { useSiteContent } from "../../context/SiteContentContext.jsx";

export default function WhatsAppBtn() {
  const { payload } = useSiteContent();
  const href = payload.floating?.whatsappUrl;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        background: "#25d366",
        color: "#fff",
        width: 60,
        height: 60,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 35,
        textDecoration: "none",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        zIndex: 9999,
        transition: "all 0.3s ease",
      }}
      aria-label="تواصل عبر واتساب"
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#1ebe57";
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#25d366";
        e.currentTarget.style.transform = "";
      }}
    >
      <i className="fab fa-whatsapp" />
    </a>
  );
}
