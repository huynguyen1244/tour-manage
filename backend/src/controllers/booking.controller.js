const bookingService = require("../services/booking.service");
const paymentService = require("../services/payment.service");
const cartService = require("../services/cart.service");
const mongoose = require("mongoose");

// Lấy toàn bộ booking
// Admin xem tất cả, user chỉ xem booking của mình
const getBookings = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    let bookings;
    if (req.user.role === "admin") {
      bookings = await bookingService.getAllBookings();
    } else {
      bookings = await bookingService.getBookingsByUserId(req.user._id);
    }

    await session.commitTransaction();

    res.json(bookings);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const getCustomerBookings = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const user_id = req.user._id;
    const bookings = await bookingService.getBookingsByUserId(user_id);
    await session.commitTransaction();
    res.json(bookings);
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Lấy booking theo id
// User chỉ xem được booking của mình, admin xem được tất
const getBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    if (
      req.user.role !== "admin" &&
      booking.user_id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    await session.commitTransaction();

    res.json(booking);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Tạo booking kèm payment (user tạo booking cho chính mình)
const createBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_id = req.user._id;
    const { cart_id, payment_method } = req.body;

    // 1. Lấy dữ liệu giỏ hàng
    const cart = await cartService.getCartByIdAndUserId(cart_id, user_id);
    if (!cart) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Cart not found or unauthorized" });
    }
    // 2. Tạo booking dựa trên dữ liệu giỏ hàng
    const bookingData = {
      user_id: user_id, // ID của người dùng đang đăng nhập
      tour_id: cart.tour_id, // hoặc tên trường chứa danh sách tour trong cart
      total_price: cart.total_price, // hoặc tính tổng tiền từ cart
      num_people: cart.num_people, // hoặc tên trường chứa số lượng người trong cart
      itineraryProgress: [], // Khởi tạo mảng tiến độ hành trình
      // Thêm các thông tin khác nếu cần
    };

    const newBooking = await bookingService.createBooking(bookingData);

    // 3. Tạo payment cho booking
    const paymentData = {
      booking_id: newBooking._id,
      payment_method,
      amount: newBooking.total_price,
    };

    const newPayment = await paymentService.createPayment(paymentData, session);

    // 4. Nếu muốn, có thể xóa giỏ hàng đã dùng
    await cartService.deleteCart(cart_id, user_id, session);

    await session.commitTransaction();

    res.status(201).json({ booking: newBooking, payment: newPayment });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Cập nhật booking
// User chỉ sửa được booking của mình, admin sửa được tất cả
const updateBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    if (
      req.user.role !== "admin" &&
      booking.user_id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    const updatedBooking = await bookingService.updateBooking(
      req.params.id,
      req.body
    );

    // Cập nhật payment liên quan nếu cần
    if (
      req.body.payment_method !== undefined ||
      req.body.total_price !== undefined
    ) {
      const updateData = {};
      if (req.body.payment_method)
        updateData.payment_method = req.body.payment_method;
      if (req.body.total_price) updateData.amount = req.body.total_price;

      await paymentService.updatePaymentByBookingId(
        updatedBooking._id,
        updateData
      );
    }

    await session.commitTransaction();

    res.json(updatedBooking);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Xóa booking
// Chỉ admin mới được xóa
const deleteBooking = async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Forbidden: Only admin can delete bookings" });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedBooking = await bookingService.deleteBooking(req.params.id);
    if (!deletedBooking)
      return res.status(404).json({ error: "Booking not found" });

    // Xóa payment liên quan
    await paymentService.deletePaymentByBookingId(deletedBooking._id);

    await session.commitTransaction();

    res.json({ message: "Booking and related payment deleted successfully" });
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const updatePayment = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const bookingId = req.params.id;
    const payment_status = req.body.payment_status;
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Booking not found" });
    }
    const updatedPayment = await paymentService.updatePaymentByBookingId(
      bookingId,
      { payment_status },
      session
    );

    if (payment_status === "completed" || payment_status === "deposited") {
      // Cập nhật trạng thái booking khi payment hoàn thành
      await bookingService.updateBooking(bookingId, { status: "confirmed" });
    }
    if (payment_status === "failed") {
      // Cập nhật trạng thái booking khi payment thất bại
      await bookingService.updateBooking(bookingId, { status: "cancelled" });
    }

    await session.commitTransaction();
    res.json(updatedPayment);
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const cancelBooking = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const bookingId = req.params.id;
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Booking not found" });
    }
    const updatedPayment = await bookingService.updateBooking(
      bookingId,
      { status: "cancelled" },
      session
    );

    await session.commitTransaction();
    res.json(updatedPayment);
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getBookings,
  getCustomerBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  updatePayment,
  cancelBooking,
};
