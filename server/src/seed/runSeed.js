import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { configureDnsForMongo } from "../configureDns.js";
import User from "../models/User.js";
import SiteContent from "../models/SiteContent.js";
import MarketingPixels from "../models/MarketingPixels.js";
import { buildDefaultPayload } from "./buildPayload.js";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });
configureDnsForMongo();

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Missing MONGODB_URI in server/.env");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("MongoDB connected (seed)");

  const payload = buildDefaultPayload();

  let doc = await SiteContent.findOne({ key: "main" });
  if (!doc) {
    doc = await SiteContent.create({ key: "main", payload });
    console.log("Created SiteContent main");
  } else {
    console.log("SiteContent main already exists, skipping payload seed");
  }

  let mkt = await MarketingPixels.findOne({ key: "main" });
  if (!mkt) {
    await MarketingPixels.create({ key: "main", snippets: [] });
    console.log("Created MarketingPixels main");
  }

  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const email = process.env.SEED_ADMIN_EMAIL?.trim();
    const password = process.env.SEED_ADMIN_PASSWORD;
    if (!email || !password) {
      console.error(
        "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in server/.env before seeding first admin.",
      );
      await mongoose.disconnect();
      process.exit(1);
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email: email.toLowerCase(),
      passwordHash: hash,
      role: "admin",
    });
    console.log(`Created admin user: ${email}`);
  } else {
    console.log("Users exist, skipping admin seed");
  }

  await mongoose.disconnect();
  console.log("Seed done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
