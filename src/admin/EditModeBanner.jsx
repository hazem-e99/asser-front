import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function EditModeBanner() {
  const [params] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const edit = params.get("edit") === "1";

  if (!edit || !isAuthenticated) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        background: "#e5b83b",
        color: "#0c1f1c",
        padding: "10px 16px",
        textAlign: "center",
        fontFamily: "'Cairo', sans-serif",
        fontWeight: 700,
        fontSize: 15,
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      وضع التحرير —{" "}
      <Link to="/admin/content" style={{ color: "#14322d", fontWeight: 800 }}>
        افتح لوحة تحكم المحتوى
      </Link>
    </div>
  );
}
