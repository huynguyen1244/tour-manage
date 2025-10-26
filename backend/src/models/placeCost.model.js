const mongoose = require("mongoose");

const placeCostSchema = new mongoose.Schema(
  {
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    // Loại hình chi phí: có thể thêm nhiều hơn sau này
    type: {
      type: String,
      enum: ["standard", "premium", "budget"],
      default: "standard",
    },
    mealCost: {
      type: Number, // chi phí ăn uống trung bình/ngày
      required: true,
    },
    hotelCost: {
      type: Number, // chi phí phòng trung bình/ngày
      required: true,
    },
    ticketCost: {
      type: Number, // vé vào cửa nếu có
      default: 0,
    },
    extraServices: [
      {
        name: String,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlaceCost", placeCostSchema);
