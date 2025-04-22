const mongoose = require('mongoose');
const Promotion = require('../models/promotion');

export const createPromotion = async (req, res) => {
  const { code, discount, startDate, endDate } = req.body;

  try {
    const newPromotion = new Promotion({
      code,
      discount,
      startDate,
      endDate
    });

    await newPromotion.save();
    res.status(201).json({ message: 'Promotion created successfully', promotion: newPromotion });
  } catch (error) {
    res.status(500).json({ message: 'Error creating promotion', error });
  }
}
  