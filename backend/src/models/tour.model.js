const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: { type: String, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    start_location: {
      type: String,
    },
    destinations: [
      {
        // địa điểm dừng chân trong tour
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    available_slots: {
      type: Number,
      required: true,
    },
    schedule: {
      type: String, // ví dụ: "3 ngày 2 đêm", hoặc "7h sáng thứ 7 hàng tuần"
      required: true,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    transport: {
      type: String, // Ví dụ: 'Bus', 'Plane', 'Cruise', 'Train'
    },
    includes: [
      {
        type: String, // ví dụ: ['Vé máy bay', 'Khách sạn 5 sao', 'Ăn sáng buffet']
      },
    ],
    excludes: [
      {
        type: String, // ví dụ: ['Chi phí cá nhân', 'Tiền tip']
      },
    ],
    policies: {
      type: String, // Chính sách hủy tour, đổi tour
    },
    itinerary: [
      {
        day: {
          type: String, // Ví dụ: "Ngày 1"
        },
        description: {
          type: String, // Chi tiết lịch trình ngày đó
        },
      },
    ],
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    status: {
      type: String,
      enum: ["available", "full", "cancelled"],
      default: "available",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Tour", TourSchema);
