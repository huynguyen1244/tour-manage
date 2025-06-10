const Booking = require("../models/booking.model");
const Tour = require("../models/tour.model");
const Payment = require("../models/payment.model");

const getAllBookings = async () => {
  const bookings = await Booking.find()
    .populate({
      path: "user_id",
      select: "-password_hash", // loại bỏ password_hash từ user
    })
    .populate("tour_id");

  // Gắn payment tương ứng cho từng booking
  const bookingsWithPayments = await Promise.all(
    bookings.map(async (booking) => {
      const payment = await Payment.findOne({ booking_id: booking._id });
      return {
        ...booking.toObject(), // convert Mongoose Document to plain JS object
        payment,
      };
    })
  );

  return bookingsWithPayments;
};

const getBookingsByUserId = async (user_id) => {
  const bookings = await Booking.find({ user_id }).populate("tour_id");
  const bookingsWithPayments = await Promise.all(
    bookings.map(async (booking) => {
      const payment = await Payment.findOne({ booking_id: booking._id });
      return {
        ...booking.toObject(), // convert Mongoose Document to plain JS object
        payment,
      };
    })
  );
  return bookingsWithPayments;
};

const getBookingById = async (id) => {
  const booking = await Booking.findById(id)
    .populate({
      path: "user_id",
      select: "-password_hash", // loại bỏ password_hash từ user
    })
    .populate("tour_id");

  const payment = await Payment.findOne({ booking_id: id });

  return {
    ...booking.toObject(),
    payment,
  };
};

const createBooking = async (bookingData) => {
  console.log("Booking data:", bookingData);

  const tour = await Tour.findById(bookingData.tour_id);
  if (!tour) {
    throw new Error("Tour not found");
  }

  if (tour.status === "full" || tour.available_slots <= 0) {
    throw new Error("Tour is fully booked");
  }

  bookingData.itineraryProgress = tour.itinerary.map((day) => ({
    day: day.day,
    description: day.description,
    completed: false,
    completedAt: null,
  }));

  const newBooking = new Booking(bookingData);
  const savedBooking = await newBooking.save();

  // Cập nhật tour
  tour.available_slots -= 1;
  if (tour.available_slots === 0) {
    tour.status = "full";
  }
  await tour.save();

  return savedBooking;
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

  // Nếu có cập nhật bước hành trình
  if (updateData.itineraryIndex) {
    for (let index of updateData.itineraryIndex) {
      await updateItineraryStep(id, index, updateData.completed);
    }
  }

  // Nếu hủy booking và trạng thái trước đó không phải đã bị hủy
  if (updateData.status === "cancelled" && booking.status !== "cancelled") {
    const tour = await Tour.findById(booking.tour_id);
    if (tour) {
      tour.available_slots += 1;
      if (tour.status === "full") {
        tour.status = "available";
      }
      await tour.save();
    }
  }
  const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedBooking) {
    throw new Error("Booking not found after update");
  }
  return updatedBooking;
};

const deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

module.exports = {
  getAllBookings,
  getBookingsByUserId,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
