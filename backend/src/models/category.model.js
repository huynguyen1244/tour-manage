const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    images: [
      {
        url: {
          type: String, // Ví dụ: "Ngày 1"
        },
        public_id: {
          type: String, // Ví dụ: "Ngày 1"
        },
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Category", CategorySchema);
