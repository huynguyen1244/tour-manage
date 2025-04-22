const refundService = require('../services/refund.service');

const getRefunds = async (req, res) => {
  try {
    const refunds = await refundService.getAllRefunds();
    res.json(refunds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRefund = async (req, res) => {
  try {
    const refund = await refundService.getRefundById(req.params.id);
    if (!refund) return res.status(404).json({ error: 'Refund not found' });
    res.json(refund);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRefund = async (req, res) => {
  try {
    const newRefund = await refundService.createRefund(req.body);
    res.status(201).json(newRefund);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateRefund = async (req, res) => {
  try {
    const updatedRefund = await refundService.updateRefund(req.params.id, req.body);
    if (!updatedRefund) return res.status(404).json({ error: 'Refund not found' });
    res.json(updatedRefund);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteRefund = async (req, res) => {
  try {
    const deleted = await refundService.deleteRefund(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Refund not found' });
    res.json({ message: 'Refund deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getRefunds,
  getRefund,
  createRefund,
  updateRefund,
  deleteRefund
};
