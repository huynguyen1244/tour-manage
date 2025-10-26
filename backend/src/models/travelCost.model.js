import mongoose from "mongoose";

const travelCostSchema = new mongoose.Schema(
  {
    fromPlace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    toPlace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    distanceKm: {
      type: Number,
      required: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    routeInfo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TravelCost", travelCostSchema);
