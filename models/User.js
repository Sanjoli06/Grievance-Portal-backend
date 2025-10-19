import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: Number,
      enum: [0, 1, 2], // 0 -> citizen, 1 -> agent, 2 -> admin
      default: 0,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
