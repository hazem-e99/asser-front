import { Router } from "express";
import SiteContent from "../models/SiteContent.js";
import { buildDefaultPayload } from "../seed/buildPayload.js";
import { authRequired, requireEditor } from "../middleware/auth.js";

const router = Router();

/** محتوى الموقع للعامة */
router.get("/", async (_req, res) => {
  let doc = await SiteContent.findOne({ key: "main" });
  if (!doc) {
    const payload = buildDefaultPayload();
    doc = await SiteContent.create({ key: "main", payload });
  }
  return res.json({ payload: doc.payload, updatedAt: doc.updatedAt });
});

router.put("/", authRequired, requireEditor, async (req, res) => {
  const { payload } = req.body;
  if (!payload || typeof payload !== "object") {
    return res.status(400).json({ error: "payload object required" });
  }
  const doc = await SiteContent.findOneAndUpdate(
    { key: "main" },
    { payload },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
  return res.json({ payload: doc.payload, updatedAt: doc.updatedAt });
});

export default router;
