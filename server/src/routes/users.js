import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { authRequired, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.use(authRequired, requireAdmin);

router.get("/", async (_req, res) => {
  const users = await User.find().select("-passwordHash").lean();
  return res.json(
    users.map((u) => ({
      id: u._id,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
    })),
  );
});

router.post("/", async (req, res) => {
  const { email, password, role = "editor" } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }
  if (!["admin", "editor"].includes(role)) {
    return res.status(400).json({ error: "invalid role" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "password min 6 characters" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      role,
    });
    return res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    throw e;
  }
});

router.patch("/:id", async (req, res) => {
  const { role } = req.body;
  if (!role || !["admin", "editor"].includes(role)) {
    return res.status(400).json({ error: "valid role required" });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select(
    "-passwordHash",
  );
  if (!user) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.json({
    id: user._id,
    email: user.email,
    role: user.role,
  });
});

router.delete("/:id", async (req, res) => {
  if (req.params.id === req.user.sub) {
    return res.status(400).json({ error: "Cannot delete yourself" });
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.json({ ok: true });
});

export default router;
