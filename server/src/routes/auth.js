import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role },
    secret,
    { expiresIn: "7d" },
  );
}

router.get("/status", async (_req, res) => {
  const count = await User.countDocuments();
  res.json({ hasUsers: count > 0 });
});

/** تسجيل أول مستخدم (عند عدم وجود أي مستخدم في القاعدة) */
router.post("/register-first", async (req, res) => {
  const count = await User.countDocuments();
  if (count > 0) {
    return res.status(403).json({ error: "Registration closed" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "password min 6 characters" });
  }
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(400).json({ error: "Email in use" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    email: email.toLowerCase(),
    passwordHash,
    role: "admin",
  });
  const token = signToken(user);
  return res.json({
    token,
    user: { id: user._id, email: user.email, role: user.role },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = signToken(user);
  return res.json({
    token,
    user: { id: user._id, email: user.email, role: user.role },
  });
});

export default router;
