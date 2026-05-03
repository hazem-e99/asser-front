const API_BASE = import.meta.env.VITE_API_URL ?? "";

export function apiUrl(path) {
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
}

export async function apiFetch(path, options = {}) {
  const { skipAuth, headers: optHeaders, ...fetchOptions } = options;
  const token = skipAuth ? null : localStorage.getItem("asser_admin_token");
  const isFormData =
    typeof FormData !== "undefined" && fetchOptions.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...optHeaders,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(apiUrl(path), { ...fetchOptions, headers });
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: text };
  }
  if (!res.ok) {
    throw new Error(data.error || res.statusText || "Request failed");
  }
  return data;
}
