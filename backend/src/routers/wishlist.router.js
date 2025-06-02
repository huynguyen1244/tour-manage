const express = require("express");
const wishlistController = require("../controllers/wishlist.controller");
const { verifyToken } = require("../middlewares/authenticate.middleware");

const router = express.Router();

router.use(verifyToken);

// User routes
router.get("/", wishlistController.getAllWishlists);
router.post("/:id", wishlistController.addTourToWishlist);
router.delete("/:id", wishlistController.removeTourFromWishlist);

module.exports = router;
