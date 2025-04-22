const mongoose = require('mongoose');
const Payment = require('../models/payment');

export const createPayment = async (req, res) => {
  const { userId, amount, method } = req.body;

  try {
    const newPayment = new Payment({
      userId,
      amount,
      method,
      status: 'pending'
    });

    await newPayment.save();
    res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error });
  }
}
  