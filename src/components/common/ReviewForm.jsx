import { useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  border: "1px solid #ccc",
  borderRadius: 8,
  fontFamily: "'Cairo', sans-serif",
  fontSize: "1rem",
  boxSizing: "border-box",
  transition: "border-color 0.3s",
  outline: "none",
};

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setName("");
    setText("");
    setRating(0);
  };

  return (
    <div
      style={{
        background: "#f9fbf9",
        borderRadius: 15,
        padding: 30,
        border: "1px solid #e0e0e0",
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <h3 style={{ color: "#30684b", marginBottom: 5, fontWeight: 800 }}>
        شاركنا تجربتك!
      </h3>
      <p style={{ color: "#666", marginBottom: 20, fontSize: "0.95rem" }}>
        يسعدنا سماع رأيك في جولتك السياحية والأماكن التي قمت بزيارتها.
      </p>
      {submitted && (
        <div
          style={{
            background: "#e8f5e9",
            color: "#30684b",
            padding: "12px 20px",
            borderRadius: 8,
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          ✅ شكراً لك! تم إرسال تقييمك بنجاح للمراجعة.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              color: "#333",
              fontWeight: 600,
            }}
          >
            تقييمك للمرشد والرحلة:
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "flex-end",
              fontSize: "1.8rem",
              color: "#dcdcdc",
            }}
          >
            {[5, 4, 3, 2, 1].map((v) => (
              <i
                key={v}
                role="button"
                tabIndex={0}
                className="fas fa-star"
                onClick={() => setRating(v)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setRating(v);
                }}
                style={{
                  padding: "0 3px",
                  cursor: "pointer",
                  color: v <= rating ? "#ffc107" : "#dcdcdc",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffc107";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = v <= rating ? "#ffc107" : "#dcdcdc";
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              color: "#333",
              fontWeight: 600,
            }}
          >
            الاسم الكريم
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="اكتب اسمك هنا..."
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              color: "#333",
              fontWeight: 600,
            }}
          >
            رأيك وتجربتك
          </label>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            placeholder="حدثنا عن الأماكن التي زرتها ورأيك في التنظيم..."
            style={{ ...inputStyle, height: "auto", resize: "vertical" }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#30684b",
            color: "#fff",
            border: "none",
            padding: "12px 30px",
            borderRadius: 8,
            fontSize: "1.1rem",
            fontWeight: 800,
            fontFamily: "'Cairo', sans-serif",
            cursor: "pointer",
            width: "100%",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#c19e66")}
          onMouseLeave={(e) => (e.target.style.background = "#30684b")}
        >
          إرسال التقييم
        </button>
      </form>
    </div>
  );
}
