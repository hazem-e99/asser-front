import { Routes, Route, Navigate } from "react-router-dom";
import PublicHome from "./pages/PublicHome.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import DashboardHome from "./admin/DashboardHome.jsx";
import ContentEditor from "./admin/ContentEditor.jsx";
import MarketingPixelsPage from "./admin/MarketingPixelsPage.jsx";
import UserManagement from "./admin/UserManagement.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";
import AdminOnlyRoute from "./admin/AdminOnlyRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicHome />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="content" element={<ContentEditor />} />
        <Route
          path="marketing"
          element={
            <AdminOnlyRoute>
              <MarketingPixelsPage />
            </AdminOnlyRoute>
          }
        />
        <Route
          path="users"
          element={
            <AdminOnlyRoute>
              <UserManagement />
            </AdminOnlyRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
