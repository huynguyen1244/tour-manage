const Payment = require("../models/payment.model");

/**
 * Lấy payment theo _id, kèm dữ liệu booking tham chiếu
 */
const getPaymentById = async (id) => {
  return await Payment.findById(id).populate("booking_id");
};

/**
 * Tạo mới một payment
 */
const createPayment = async (paymentData) => {
  const newPayment = new Payment(paymentData);
  return await newPayment.save();
};

const updatePaymentByBookingId = async (bookingId, updateData) => {
  return await Payment.findOneAndUpdate({ booking_id: bookingId }, updateData, {
    new: true,
  });
};

const deletePaymentByBookingId = async (bookingId) => {
  return await Payment.findOneAndDelete({ booking_id: bookingId });
};

/**
 * Cập nhật payment theo _id
 */
const updatePayment = async (id, updateData) => {
  return await Payment.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Xóa payment theo _id
 */
const deletePayment = async (id) => {
  return await Payment.findByIdAndDelete(id);
};

/**
 * Cập nhật trạng thái payment theo transaction_id (mã giao dịch)
 * Dùng cho callback payment gateway
 */
const updatePaymentStatusByTransactionId = async (transactionId, status) => {
  return await Payment.findOneAndUpdate(
    { transaction_id: transactionId },
    { payment_status: status },
    { new: true }
  );
};

module.exports = {
  getPaymentById,
  createPayment,
  updatePaymentByBookingId,
  deletePaymentByBookingId,
  updatePayment,
  deletePayment,
  updatePaymentStatusByTransactionId,
};
