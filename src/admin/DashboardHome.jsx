import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const card = {
  display: "block",
  padding: 24,
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  textDecoration: "none",
  color: "#14322d",
  fontWeight: 700,
  marginBottom: 16,
};

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ color: "#30684b", marginBottom: 8 }}>مرحباً {user?.email}</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>اختر قسم التحرير.</p>
      <Link to="/admin/content" style={card}>
        تحرير محتوى الصفحة الرئيسية (JSON)
      </Link>
      {user?.role === "admin" && (
        <Link to="/admin/marketing" style={card}>
          أكواد البيكسل والتسويق
        </Link>
      )}
      {user?.role === "admin" && (
        <Link to="/admin/users" style={card}>
          إدارة المستخدمين
        </Link>
      )}
    </div>
  );
}
