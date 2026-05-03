import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    name: { type: String, default: "snippet" },
    placement: { type: String, enum: ["head", "bodyEnd"], default: "head" },
    code: { type: String, default: "" },
    platform: { type: String, default: "custom" },
    presetFields: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: false, strict: false },
);

const marketingPixelsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: "main", index: true },
    snippets: [snippetSchema],
  },
  { timestamps: true },
);

export default mongoose.models.MarketingPixels || mongoose.model("MarketingPixels", marketingPixelsSchema);
