const Payment = require('../models/payment.model');

const getAllPayments = async () => {
  return await Payment.find().populate('booking_id');
};

const getPaymentById = async (id) => {
  return await Payment.findById(id).populate('booking_id');
};

const createPayment = async (paymentData) => {
  const newPayment = new Payment(paymentData);
  return await newPayment.save();
};

const updatePayment = async (id, updateData) => {
  return await Payment.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePayment = async (id) => {
  return await Payment.findByIdAndDelete(id);
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
};
