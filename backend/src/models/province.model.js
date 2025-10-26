import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    region: {
      type: String,
      enum: ["Bắc", "Trung", "Nam"],
    },
    imageUrl: {
      type: String,
    },
    averageHotelCost: {
      type: Number,
      default: 0,
    },
    averageMealCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // tự động tạo createdAt, updatedAt
  }
);

export default mongoose.model("Province", provinceSchema);
