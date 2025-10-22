import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiry: { type: Date, required: true },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
