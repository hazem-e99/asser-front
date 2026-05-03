import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api.js";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("editor");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const list = await apiFetch("/api/users");
      setUsers(list);
      setErr("");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addUser(e) {
    e.preventDefault();
    setErr("");
    try {
      await apiFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ email, password, role }),
      });
      setEmail("");
      setPassword("");
      setRole("editor");
      await load();
    } catch (ex) {
      setErr(ex.message);
    }
  }

  async function removeUser(id) {
    if (!confirm("حذف هذا المستخدم؟")) return;
    setErr("");
    try {
      await apiFetch(`/api/users/${id}`, { method: "DELETE" });
      await load();
    } catch (ex) {
      setErr(ex.message);
    }
  }

  if (loading) return <p>جاري التحميل...</p>;

  return (
    <div>
      <h1 style={{ color: "#30684b", marginBottom: 16 }}>المستخدمون</h1>
      {err && (
        <div style={{ background: "#ffebee", color: "#c62828", padding: 12, borderRadius: 8, marginBottom: 12 }}>
          {err}
        </div>
      )}
      <form
        onSubmit={addUser}
        style={{
          marginBottom: 32,
          padding: 20,
          background: "#fff",
          borderRadius: 12,
          maxWidth: 480,
        }}
      >
        <h2 style={{ fontSize: "1.1rem", marginBottom: 12 }}>إضافة مستخدم</h2>
        <input
          type="email"
          required
          placeholder="البريد"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 8,
            padding: 10,
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 8,
            padding: 10,
            boxSizing: "border-box",
          }}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ marginBottom: 12, padding: 8 }}>
          <option value="editor">محرر</option>
          <option value="admin">مشرف</option>
        </select>
        <button
          type="submit"
          style={{
            display: "block",
            padding: "10px 20px",
            background: "#30684b",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          إضافة
        </button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#14322d", color: "#fff" }}>
            <th style={{ padding: 12, textAlign: "right" }}>البريد</th>
            <th style={{ padding: 12, textAlign: "right" }}>الدور</th>
            <th style={{ padding: 12, textAlign: "right" }}>إجراء</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 12 }}>{u.email}</td>
              <td style={{ padding: 12 }}>{u.role}</td>
              <td style={{ padding: 12 }}>
                <button
                  type="button"
                  onClick={() => removeUser(u.id)}
                  style={{
                    background: "#c62828",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
