import { Router } from "express";
import MarketingPixels from "../models/MarketingPixels.js";
import { authRequired, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res) => {
  let doc = await MarketingPixels.findOne({ key: "main" });
  if (!doc) {
    doc = await MarketingPixels.create({ key: "main", snippets: [] });
  }
  return res.json({ snippets: doc.snippets, updatedAt: doc.updatedAt });
});

router.put("/", authRequired, requireAdmin, async (req, res) => {
  const { snippets } = req.body;
  if (!Array.isArray(snippets)) {
    return res.status(400).json({ error: "snippets array required" });
  }
  const doc = await MarketingPixels.findOneAndUpdate(
    { key: "main" },
    { snippets },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
  return res.json({ snippets: doc.snippets, updatedAt: doc.updatedAt });
});

export default router;
