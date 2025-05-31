const bookingService = require("../services/booking.service");
const mongoose = require("mongoose");

const getBookings = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const bookings = await bookingService.getAllBookings();
    await session.commitTransaction();

    res.json(bookings);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const getBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    await session.commitTransaction();

    res.json(booking);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const createBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_id = req.user._id;
    const newBooking = await bookingService.createBooking(user_id, req.body);
    await session.commitTransaction();

    res.status(201).json(newBooking);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const updateBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedBooking = await bookingService.updateBooking(
      req.params.id,
      req.body
    );
    if (!updatedBooking)
      return res.status(404).json({ error: "Booking not found" });
    await session.commitTransaction();

    res.json(updatedBooking);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const deleteBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleted = await bookingService.deleteBooking(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Booking not found" });
    await session.commitTransaction();

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
