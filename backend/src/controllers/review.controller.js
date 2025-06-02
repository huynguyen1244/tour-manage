const reviewService = require("../services/review.service");
const mongoose = require("mongoose");

// Không cần đăng nhập
const getReviews = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const reviews = await reviewService.getAllReviews();
    await session.commitTransaction();

    res.json(reviews);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Không cần đăng nhập
const getReview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const review = await reviewService.getReviewById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    await session.commitTransaction();

    res.json(review);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Chỉ user bình thường được tạo, không cho admin tạo
const createReview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = req.user;
    // Giả sử user.role là string: "user", "admin", "manager", "staff"
    if (user.role !== "user") {
      await session.abortTransaction();
      return res
        .status(403)
        .json({ error: "Admin/Manager/Staff cannot create review" });
    }

    // Gắn thêm user_id vào review để biết ai tạo
    const reviewData = { ...req.body, user: user._id };

    const newReview = await reviewService.createReview(reviewData);
    await session.commitTransaction();

    res.status(201).json(newReview);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Chỉ người đã đăng nhập mới sửa được
// Quản trị viên sửa được mọi review
// Người dùng bình thường chỉ sửa review của mình
const updateReview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = req.user;
    const reviewId = req.params.id;

    const existingReview = await reviewService.getReviewById(reviewId);
    if (!existingReview) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Review not found" });
    }

    if (
      user.role !== "user" &&
      user.role !== "admin" &&
      user.role !== "manager" &&
      user.role !== "staff"
    ) {
      await session.abortTransaction();
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Nếu user bình thường, chỉ được sửa review của mình
    if (
      user.role === "user" &&
      existingReview.user.toString() !== user._id.toString()
    ) {
      await session.abortTransaction();
      return res
        .status(403)
        .json({ error: "You can only update your own review" });
    }

    const updatedReview = await reviewService.updateReview(reviewId, req.body);
    await session.commitTransaction();

    res.json(updatedReview);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Tương tự updateReview, chỉ admin/manager/staff hoặc user tạo review mới được xóa
// Nhưng yêu cầu quản trị viên mới xóa được, user thường không được xóa
const deleteReview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = req.user;
    const reviewId = req.params.id;

    const existingReview = await reviewService.getReviewById(reviewId);
    if (!existingReview) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Review not found" });
    }

    // Chỉ admin, manager, staff mới được xóa
    if (!["admin", "manager", "staff"].includes(user.role)) {
      await session.abortTransaction();
      return res
        .status(403)
        .json({ error: "Only admin/manager/staff can delete reviews" });
    }

    const deleted = await reviewService.deleteReview(reviewId);
    if (!deleted) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Review not found" });
    }

    await session.commitTransaction();

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
