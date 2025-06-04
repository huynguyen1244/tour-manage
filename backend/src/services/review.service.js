const Review = require("../models/review.model");

const getAllReviews = async () => {
  return await Review.find().populate("user_id").populate("tour_id");
};

const getReviewById = async (tour_id) => {
  return await Review.find({ tour_id }).populate("user_id").populate("tour_id");
};

const createReview = async (reviewData) => {
  const newReview = new Review(reviewData);
  return await newReview.save();
};

const updateReview = async (id, updateData) => {
  return await Review.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
