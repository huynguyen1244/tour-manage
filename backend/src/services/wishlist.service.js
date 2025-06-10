const Wishlist = require("../models/wishlist.model");

// Lấy tất cả wishlist của 1 người dùng
const getAllWishlists = async (user_id) => {
  return await Wishlist.find({ user_id }).populate("tour_id");
};

// Thêm tour vào wishlist của người dùng
const addTourToWishlist = async (user_id, tour_id) => {
  const existing = await Wishlist.findOne({ user_id, tour_id }).populate(
    "tour_id"
  );

  if (existing) {
    return existing;
  }

  // Nếu chưa có, tạo mới bản ghi
  const newWishlistItem = await new Wishlist({ user_id, tour_id }).save();
  return await newWishlistItem.populate("tour_id");
};

// Xoá tour khỏi wishlist của người dùng
const removeTourFromWishlist = async (user_id, tour_id) => {
  const deleted = await Wishlist.findOneAndDelete({ user_id, tour_id });

  if (!deleted) return null;

  return deleted;
};

module.exports = {
  getAllWishlists,
  addTourToWishlist,
  removeTourFromWishlist,
};
