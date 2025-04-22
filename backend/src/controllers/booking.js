const mongoose = require('mongoose');
const Booking = require('../models/Booking');

export const createBooking = async (req, res) => {
  const { userId, hotelId, checkInDate, checkOutDate } = req.body;

  try {
    const newBooking = new Booking({
      userId,
      hotelId,
      checkInDate,
      checkOutDate
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
}
  