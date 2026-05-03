import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f0ede8", fontFamily: "'Cairo', sans-serif" }}>
      <header
        style={{
          background: "#14322d",
          color: "#fff",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <strong>لوحة التحكم</strong>
        <nav style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <Link to="/admin" style={{ color: "#dccdae" }}>
            الرئيسية
          </Link>
          <Link to="/admin/content" style={{ color: "#dccdae" }}>
            المحتوى
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin/marketing" style={{ color: "#dccdae" }}>
              البيكسل والتسويق
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin/users" style={{ color: "#dccdae" }}>
              المستخدمون
            </Link>
          )}
          <Link to="/?edit=1" style={{ color: "#e5b83b" }}>
            المعاينة
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            style={{
              background: "#30684b",
              border: "none",
              color: "#fff",
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            خروج
          </button>
        </nav>
      </header>
      <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
