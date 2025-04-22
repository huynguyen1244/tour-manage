const promotionService = require('../services/promotion.service');

const getPromotions = async (req, res) => {
  try {
    const promotions = await promotionService.getAllPromotions();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPromotion = async (req, res) => {
  try {
    const promotion = await promotionService.getPromotionById(req.params.id);
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json(promotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPromotion = async (req, res) => {
  try {
    const newPromotion = await promotionService.createPromotion(req.body);
    res.status(201).json(newPromotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePromotion = async (req, res) => {
  try {
    const updatedPromotion = await promotionService.updatePromotion(req.params.id, req.body);
    if (!updatedPromotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json(updatedPromotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletePromotion = async (req, res) => {
  try {
    const deleted = await promotionService.deletePromotion(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Promotion not found' });
    res.json({ message: 'Promotion deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPromotions,
  getPromotion,
  createPromotion,
  updatePromotion,
  deletePromotion
};
