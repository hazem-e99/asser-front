import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "editor"],
      default: "editor",
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
