const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Category", CategorySchema);
