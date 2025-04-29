const wishlistService = require('../services/wishlist.service');

const getAllWishlists = async (req, res) => {
  try {
    const wishlists = await wishlistService.getAllWishlists();
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getWishlistByUserId = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlistByUserId(req.params.userId);
    if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const addTourToWishlist = async (req, res) => {
  try {
    const { userId, tourId } = req.body;
    const wishlist = await wishlistService.addTourToWishlist(userId, tourId);
    res.status(201).json(wishlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const removeTourFromWishlist = async (req, res) => {
  try {
    const { userId, tourId } = req.body;
    const wishlist = await wishlistService.removeTourFromWishlist(userId, tourId);
    if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });
    res.json(wishlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getAllWishlists,
  getWishlistByUserId,
  addTourToWishlist,
  removeTourFromWishlist
};
