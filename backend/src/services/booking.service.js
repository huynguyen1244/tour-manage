const Booking = require('../models/booking.model');

const getAllBookings = async () => {
  return await Booking.find().populate('user_id tour_id');
};

const getBookingById = async (id) => {
  return await Booking.findById(id).populate('user_id tour_id');
};

const createBooking = async (bookingData) => {
  const newBooking = new Booking(bookingData);
  return await newBooking.save();
};

const updateBooking = async (id, updateData) => {
  return await Booking.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};
