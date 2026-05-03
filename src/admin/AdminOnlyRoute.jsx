import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminOnlyRoute({ children }) {
  const { user } = useAuth();
  if (user?.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
