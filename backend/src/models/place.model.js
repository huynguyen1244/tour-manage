import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province", // liên kết với Province
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    description: String,
    estimatedVisitTime: {
      type: Number,
      default: 1,
    },
    ticketPrice: {
      type: Number,
      default: 0,
    },
    openHours: {
      type: String, // ví dụ: "08:00-17:00"
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Place", placeSchema);
