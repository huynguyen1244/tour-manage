const Promotion = require('../models/promotion.model');

const getAllPromotions = async () => {
  return await Promotion.find().populate('tour_id');
};

const getPromotionById = async (id) => {
  return await Promotion.findById(id).populate('tour_id');
};

const createPromotion = async (promotionData) => {
  const newPromotion = new Promotion(promotionData);
  return await newPromotion.save();
};

const updatePromotion = async (id, updateData) => {
  return await Promotion.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePromotion = async (id) => {
  return await Promotion.findByIdAndDelete(id);
};

module.exports = {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion
};
