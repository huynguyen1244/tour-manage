const wishlistService = require("../services/wishlist.service");

const getAllWishlists = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const wishlists = await wishlistService.getAllWishlists();
    await session.commitTransaction();

    res.json(wishlists);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const getWishlistByUserId = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const wishlist = await wishlistService.getWishlistByUserId(
      req.params.userId
    );
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });
    await session.commitTransaction();

    res.json(wishlist);
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
    const { userId, tourId } = req.body;
    const wishlist = await wishlistService.addTourToWishlist(userId, tourId);
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
    const { userId, tourId } = req.body;
    const wishlist = await wishlistService.removeTourFromWishlist(
      userId,
      tourId
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
  getWishlistByUserId,
  addTourToWishlist,
  removeTourFromWishlist,
};
