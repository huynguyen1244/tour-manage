const paymentService = require("../services/payment.service");
const mongoose = require("mongoose");

const getPayments = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const payments = await paymentService.getAllPayments();
    await session.commitTransaction();

    res.json(payments);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const getPayment = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const payment = await paymentService.getPaymentById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    await session.commitTransaction();

    res.json(payment);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const createPayment = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newPayment = await paymentService.createPayment(req.body);
    await session.commitTransaction();

    res.status(201).json(newPayment);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const updatePayment = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedPayment = await paymentService.updatePayment(
      req.params.id,
      req.body
    );
    if (!updatedPayment)
      return res.status(404).json({ error: "Payment not found" });
    await session.commitTransaction();

    res.json(updatedPayment);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const deletePayment = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleted = await paymentService.deletePayment(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Payment not found" });
    await session.commitTransaction();

    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
};
