const mongoose = require('mongoose');
const Tour = require('../models/tour');

export const createTour = async (req, res) => {
  const { title, description, price, duration, startDate, endDate } = req.body;

  try {
    const newTour = new Tour({
      title,
      description,
      price,
      duration,
      startDate,
      endDate
    });

    await newTour.save();
    res.status(201).json({ message: 'Tour created successfully', tour: newTour });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tour', error });
  }
}
  