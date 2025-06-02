const promotionService = require("../services/promotion.service");
const mongoose = require("mongoose");

// Xem tất cả promotions (ai cũng xem được)
const getPromotions = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

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

// Xem promotion theo id (ai cũng xem được)
const getPromotion = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const promotion = await promotionService.getPromotionById(req.params.id);
    if (!promotion) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Promotion not found" });
    }

    await session.commitTransaction();
    res.json(promotion);
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Tạo promotion (chỉ admin/manager được gọi, kiểm tra quyền ngoài controller)
const createPromotion = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Có thể kiểm tra req.user.role ở đây nếu muốn

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

// Cập nhật promotion (chỉ admin/manager được gọi)
const updatePromotion = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updatedPromotion = await promotionService.updatePromotion(
      req.params.id,
      req.body
    );
    if (!updatedPromotion) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Promotion not found" });
    }

    await session.commitTransaction();
    res.json(updatedPromotion);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Xóa promotion (chỉ admin/manager được gọi)
const deletePromotion = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleted = await promotionService.deletePromotion(req.params.id);
    if (!deleted) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Promotion not found" });
    }

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
