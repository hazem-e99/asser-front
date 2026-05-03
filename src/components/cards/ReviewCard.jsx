import Stars from "../common/Stars";

export default function ReviewCard({ text, name, from, initial }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        padding: 25,
        boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
        borderTop: "5px solid #c19e66",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
    >
      <Stars />
      <p
        style={{
          color: "#555",
          fontSize: "1rem",
          lineHeight: 1.7,
          marginBottom: 20,
          fontStyle: "italic",
        }}
      >
        {text}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <div
          style={{
            width: 50,
            height: 50,
            background: "#30684b",
            color: "#fff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          {initial}
        </div>
        <div>
          <h4
            style={{
              margin: 0,
              color: "#30684b",
              fontSize: "1.1rem",
              fontWeight: 800,
            }}
          >
            {name}
          </h4>
          <span style={{ fontSize: "0.85rem", color: "#888" }}>{from}</span>
        </div>
      </div>
    </div>
  );
}
