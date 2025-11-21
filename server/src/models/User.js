import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, index: true, unique: true, sparse: true },
    email: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    passwordHash: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
