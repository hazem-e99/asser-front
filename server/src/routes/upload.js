import { Router } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";
import { authRequired, requireEditor } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir =
  process.env.UPLOAD_DIR || path.join(__dirname, "../../uploads");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9._\u0600-\u06FF-]/g, "_")
      .slice(0, 80);
    cb(null, `${Date.now()}-${base || "file"}${ext}`);
  },
});

const maxMb = Number(process.env.UPLOAD_MAX_MB || 80);

const upload = multer({
  storage,
  limits: { fileSize: maxMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok =
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/") ||
      file.mimetype === "application/octet-stream";
    if (!ok) {
      cb(new Error("يسمح برفع صور أو فيديو فقط"));
      return;
    }
    cb(null, true);
  },
});

const router = Router();

router.post("/", authRequired, requireEditor, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "لم يُرفع ملف" });
  }
  const publicPath = `/uploads/${req.file.filename}`;
  res.json({
    url: publicPath,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
  });
});

export { uploadDir };
export default router;
