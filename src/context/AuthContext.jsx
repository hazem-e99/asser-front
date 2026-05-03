import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "../lib/api.js";

const AuthContext = createContext(null);
const TOKEN_KEY = "asser_admin_token";
const USER_KEY = "asser_admin_user";

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() =>
    localStorage.getItem(TOKEN_KEY) ? readStoredUser() : null,
  );

  const login = useCallback(async (email, password) => {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const registerFirst = useCallback(async (email, password) => {
    const data = await apiFetch("/api/auth/register-first", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
      registerFirst,
    }),
    [token, user, login, logout, registerFirst],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
