const reviewService = require("../services/review.service");

const getReviews = async (req, res) => {
  const session = await mongoose.startSession();

  try {
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

const getReview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
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

const createReview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const newReview = await reviewService.createReview(req.body);
    await session.commitTransaction();

    res.status(201).json(newReview);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const updateReview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const updatedReview = await reviewService.updateReview(
      req.params.id,
      req.body
    );
    if (!updatedReview)
      return res.status(404).json({ error: "Review not found" });
    await session.commitTransaction();

    res.json(updatedReview);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const deleteReview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const deleted = await reviewService.deleteReview(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Review not found" });
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
