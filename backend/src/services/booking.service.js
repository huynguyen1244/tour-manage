const Booking = require("../models/booking.model");
const Tour = require("../models/tour.model");

const getAllBookings = async () => {
  return await Booking.find().populate("user_id tour_id");
};

const getBookingById = async (id) => {
  return await Booking.findById(id).populate("user_id tour_id");
};

const createBooking = async (bookingData) => {
  console.log("Booking data:", bookingData);
  const tour = await Tour.findById(bookingData.tour_id);
  if (!tour) {
    throw new Error("Tour not found");
  }
  bookingData.itineraryProgress = tour.itinerary.map((day) => ({
    day: day.day,
    description: day.description,
    completed: false,
    completedAt: null,
  }));
  const newBooking = new Booking(bookingData);
  return await newBooking.save();
};

const updateItineraryStep = async (booking_id, index, completed) => {
  const booking = await Booking.findById(booking_id);
  if (!booking) throw new Error("booking not found");

  if (booking.itineraryProgress[index]) {
    booking.itineraryProgress[index].completed = completed;
    booking.itineraryProgress[index].completedAt = completed
      ? new Date()
      : null;
  }

  return await booking.save();
};

const updateBooking = async (id, updateData) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new Error("Booking not found");
  }
  for (let index in updateData.itineraryIndex) {
    await updateItineraryStep(id, index, updateData.completed);
  }

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
  deleteBooking,
};
