const wishlistService = require("../services/wishlist.service");
const mongoose = require("mongoose");

const getAllWishlists = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_id = req.user.id;

    const wishlists = await wishlistService.getAllWishlists(user_id);
    await session.commitTransaction();

    res.json(wishlists);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const addTourToWishlist = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_id = req.user.id;

    const wishlist = await wishlistService.addTourToWishlist(
      user_id,
      req.params.id
    );
    await session.commitTransaction();

    res.status(201).json(wishlist);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const removeTourFromWishlist = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_id = req.user.id;
    const wishlist = await wishlistService.removeTourFromWishlist(
      user_id,
      req.params.id
    );
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });
    await session.commitTransaction();

    res.json(wishlist);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getAllWishlists,
  addTourToWishlist,
  removeTourFromWishlist,
};
