import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import marketingRoutes from "./routes/marketing.js";
import usersRoutes from "./routes/users.js";
import uploadRoutes, { uploadDir } from "./routes/upload.js";
import { configureDnsForMongo } from "./configureDns.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });
configureDnsForMongo();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_ORIGIN.split(",").map((s) => s.trim()),
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));

app.use("/uploads", express.static(uploadDir));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/marketing", marketingRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/upload", uploadRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Set MONGODB_URI in server/.env");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("Set JWT_SECRET in server/.env");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`API listening on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
