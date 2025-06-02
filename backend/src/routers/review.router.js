const express = require("express");
const reviewController = require("../controllers/review.controller");
const { verifyToken } = require("../middlewares/authenticate.middleware");

const router = express.Router();

// Ai cũng xem được
router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReview);

// Các route dưới đây phải đăng nhập
router.post("/", verifyToken, reviewController.createReview);
router.put("/:id", verifyToken, reviewController.updateReview);
router.delete("/:id", verifyToken, reviewController.deleteReview);

module.exports = router;
