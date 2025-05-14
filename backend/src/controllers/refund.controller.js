const refundService = require("../services/refund.service");

const getRefunds = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const refunds = await refundService.getAllRefunds();
    await session.commitTransaction();

    res.json(refunds);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const getRefund = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const refund = await refundService.getRefundById(req.params.id);
    if (!refund) return res.status(404).json({ error: "Refund not found" });
    await session.commitTransaction();

    res.json(refund);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const createRefund = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const newRefund = await refundService.createRefund(req.body);
    await session.commitTransaction();

    res.status(201).json(newRefund);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const updateRefund = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const updatedRefund = await refundService.updateRefund(
      req.params.id,
      req.body
    );
    if (!updatedRefund)
      return res.status(404).json({ error: "Refund not found" });
    await session.commitTransaction();

    res.json(updatedRefund);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const deleteRefund = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const deleted = await refundService.deleteRefund(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Refund not found" });
    await session.commitTransaction();

    res.json({ message: "Refund deleted successfully" });
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getRefunds,
  getRefund,
  createRefund,
  updateRefund,
  deleteRefund,
};
