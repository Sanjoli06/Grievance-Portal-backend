import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    HouseAddress: {
      type: String,
      required: true,
      trim: true,
    },
    City: {
      type: String,
      required: true,
      trim: true,
    },
    State: {
      type: String,
      required: true,
      trim: true,
    },
    Country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Address", addressSchema);
