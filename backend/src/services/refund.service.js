const Refund = require('../models/refund.model');

const getAllRefunds = async () => {
  return await Refund.find().populate('booking_id');
};

const getRefundById = async (id) => {
  return await Refund.findById(id).populate('booking_id');
};

const createRefund = async (refundData) => {
  const newRefund = new Refund(refundData);
  return await newRefund.save();
};

const updateRefund = async (id, updateData) => {
  return await Refund.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteRefund = async (id) => {
  return await Refund.findByIdAndDelete(id);
};

module.exports = {
  getAllRefunds,
  getRefundById,
  createRefund,
  updateRefund,
  deleteRefund
};
