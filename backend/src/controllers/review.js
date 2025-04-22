const mongoose = require('mongoose');
const Review = require('../models/review');

export const createReview = async (req, res) => {
  const { productId, userId, rating, comment } = req.body;

  try {
    const newReview = new Review({
      productId,
      userId,
      rating,
      comment,
      createdAt: new Date()
    });

    await newReview.save();
    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error });
  }
}
  