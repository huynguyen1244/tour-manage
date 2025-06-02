const Wishlist = require("../models/wishlist.model");

// Lấy tất cả wishlist của 1 người dùng
const getAllWishlists = async (user_id) => {
  return await Wishlist.findOne({ user_id }).populate("tours");
};

// Thêm tour vào wishlist của người dùng
const addTourToWishlist = async (user_id, tour_id) => {
  let wishlist = await Wishlist.findOne({ user_id });

  if (!wishlist) {
    // Nếu chưa có wishlist -> tạo mới
    wishlist = new Wishlist({ user_id, tours: [tour_id] });
  } else {
    // Nếu chưa có tour đó trong wishlist thì thêm vào
    if (
      !wishlist.tour_id.some((tour) => tour.toString() === tour_id.toString())
    ) {
      wishlist.tour_id.push(tour_id);
    }
  }

  return await wishlist.save();
};

// Xoá tour khỏi wishlist của người dùng
const removeTourFromWishlist = async (user_id, tour_id) => {
  const wishlist = await Wishlist.findOne({ user_id });

  if (!wishlist) return null;

  const initialLength = wishlist.tour_id.length;

  wishlist.tour_id = wishlist.tour_id.filter(
    (tour) => tour.toString() !== tour_id.toString()
  );

  if (wishlist.tour_id.length === initialLength) return wishlist; // Không có gì bị xoá

  return await wishlist.save();
};

module.exports = {
  getAllWishlists,
  addTourToWishlist,
  removeTourFromWishlist,
};
