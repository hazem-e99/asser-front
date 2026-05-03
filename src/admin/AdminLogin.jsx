import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, registerFirst, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasUsers, setHasUsers] = useState(true);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch("/api/auth/status", { skipAuth: true })
      .then((d) => setHasUsers(d.hasUsers))
      .catch(() => setHasUsers(true));
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/admin", { replace: true });
  }, [isAuthenticated, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      if (!hasUsers) {
        await registerFirst(email, password);
      } else {
        await login(email, password);
      }
      navigate("/admin");
    } catch (ex) {
      setErr(ex.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f5f0",
        fontFamily: "'Cairo', sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          maxWidth: 420,
          width: "100%",
        }}
      >
        <h1 style={{ color: "#30684b", marginBottom: 8, fontSize: "1.5rem" }}>
          {hasUsers ? "تسجيل الدخول" : "إنشاء حساب المشرف الأول"}
        </h1>
        <p style={{ color: "#666", marginBottom: 24, fontSize: 14 }}>
          {hasUsers
            ? "أدخل بيانات الحساب الإداري."
            : "لا يوجد مستخدمون بعد — أنشئ حساب المشرف الأول."}
        </p>
        {err && (
          <div
            style={{
              background: "#ffebee",
              color: "#c62828",
              padding: 12,
              borderRadius: 8,
              marginBottom: 16,
              fontSize: 14,
            }}
          >
            {err}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>البريد</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 16,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>كلمة المرور</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 24,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 14,
              background: "#30684b",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 800,
              fontFamily: "inherit",
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "..." : hasUsers ? "دخول" : "إنشاء الحساب"}
          </button>
        </form>
        <p style={{ marginTop: 20, textAlign: "center" }}>
          <Link to="/" style={{ color: "#30684b" }}>
            العودة للموقع
          </Link>
        </p>
      </div>
    </div>
  );
}
