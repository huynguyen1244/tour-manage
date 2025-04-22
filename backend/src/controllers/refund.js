const mongoose = require('mongoose');
const Refund = require('../models/refund');

export const createRefund = async (req, res) => {
  const { orderId, reason } = req.body;

  try {
    const newRefund = new Refund({
      orderId,
      reason,
      status: 'pending'
    });

    await newRefund.save();
    res.status(201).json({ message: 'Refund request created successfully', refund: newRefund });
  } catch (error) {
    res.status(500).json({ message: 'Error creating refund request', error });
  }
}
  