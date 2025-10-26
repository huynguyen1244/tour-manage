const mongoose = require("mongoose");

const CustomTourSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    provinceList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province",
      },
    ],
    selectedPlaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
        required: true,
      },
    ],
    optimizedRoute: [
      {
        from: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
        to: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
        distanceKm: Number,
        durationMinutes: Number,
      },
    ],
    totalDistance: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: Number,
      default: 0,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    days: {
      type: Number,
      default: 1,
    },
    startDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "confirmed", "cancelled"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CustomTour", CustomTourSchema);
