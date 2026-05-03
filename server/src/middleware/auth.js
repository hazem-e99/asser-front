import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "JWT_SECRET not configured" });
    }
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
}

export function requireEditor(req, res, next) {
  if (!req.user || !["admin", "editor"].includes(req.user.role)) {
    return res.status(403).json({ error: "Editor or admin required" });
  }
  next();
}
