const promotionService = require("../services/promotion.service");

const getPromotions = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const promotions = await promotionService.getAllPromotions();
    await session.commitTransaction();

    res.json(promotions);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const getPromotion = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const promotion = await promotionService.getPromotionById(req.params.id);
    if (!promotion)
      return res.status(404).json({ error: "Promotion not found" });
    await session.commitTransaction();

    res.json(promotion);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const createPromotion = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const newPromotion = await promotionService.createPromotion(req.body);
    await session.commitTransaction();

    res.status(201).json(newPromotion);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const updatePromotion = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const updatedPromotion = await promotionService.updatePromotion(
      req.params.id,
      req.body
    );
    if (!updatedPromotion)
      return res.status(404).json({ error: "Promotion not found" });
    await session.commitTransaction();

    res.json(updatedPromotion);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const deletePromotion = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const deleted = await promotionService.deletePromotion(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Promotion not found" });
    await session.commitTransaction();

    res.json({ message: "Promotion deleted successfully" });
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getPromotions,
  getPromotion,
  createPromotion,
  updatePromotion,
  deletePromotion,
};
