const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tour_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

WishlistSchema.index({ user_id: 1, tour_id: 1 }, { unique: true });

module.exports = mongoose.model("Wishlist", WishlistSchema);
