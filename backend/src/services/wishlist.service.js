const Wishlist = require('../models/wishlist.model');

const getAllWishlists = async () => {
  return await Wishlist.find().populate('tours');
}

const getWishlistByUserId = async (userId) => {
    return await Wishlist.findOne({ userId }).populate('tours');
  }

const addTourToWishlist = async (userId, tourId) => {
  const wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    const newWishlist = new Wishlist({ userId, tours: [tourId] });
    return await newWishlist.save();
  } else {
    if (!wishlist.tours.includes(tourId)) {
      wishlist.tours.push(tourId);
      return await wishlist.save();
    }
    return wishlist;
  }
}

const removeTourFromWishlist = async (userId, tourId) => {
  const wishlist = await Wishlist.findOne({ userId });
  if (wishlist) {
    wishlist.tours = wishlist.tours.filter(tour => tour.toString() !== tourId.toString());
    return await wishlist.save();
  }
  return null;
}

module.exports = {
  getAllWishlists,
  getWishlistByUserId,
  addTourToWishlist,
  removeTourFromWishlist
};