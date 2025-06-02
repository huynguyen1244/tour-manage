const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  payment_method: {
    type: String,
    enum: ["vnpay", "momo", "banking"],
  },
  payment_status: {
    type: String,
    enum: ["pending", "deposited", "completed", "failed"],
    default: "pending",
  },
  transaction_id: String,
  payment_date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
