const reviewService = require("../services/review.service");
const reviewModel = require("../models/review.model");
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

    // if (user.role !== "customer") {
    //   await session.abortTransaction();
    //   return res
    //     .status(403)
    //     .json({ error: "Admin/Manager/Staff cannot create review" });
    // }

    // Kiểm tra xem user đã đăng nhập chưa
    if (!user || user.role !== "customer") {
      await session.abortTransaction();
      return res
        .status(403)
        .json({ error: "Only customers can create reviews" });
    }

    // Gắn thêm user_id vào review để biết ai tạo
    const reviewData = { ...req.body, user_id: user.id };

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

    // // Nếu user bình thường, chỉ được sửa review của mình
    // if (
    //   user.role === "customer" &&
    //   existingReview.user.toString() !== user.id.toString()
    // ) {
    //   await session.abortTransaction();
    //   return res
    //     .status(403)
    //     .json({ error: "You can only update your own review" });
    // }

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
// Nhưng yêu cầu quản trị viên mới xóa được, customer được xóa review của bản thân
const deleteReview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const reviewId = req.params.id;
    const user = req.user;

    const existingReview = await reviewModel.findById(reviewId);
    if (!existingReview) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Review not found" });
    }

    const isOwner =
      existingReview.user_id &&
      existingReview.user_id.toString() === user.id.toString();
    const isPrivileged =
      user.role === "admin" || user.role === "manager" || user.role === "staff";

    if (isOwner || isPrivileged) {
      const deleted = await reviewService.deleteReview(reviewId);
      if (!deleted) {
        await session.abortTransaction();
        return res.status(404).json({ error: "Review not found" });
      }
    } else {
      await session.abortTransaction();
      return res.status(403).json({ error: "Bạn không có quyền xóa" });
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
