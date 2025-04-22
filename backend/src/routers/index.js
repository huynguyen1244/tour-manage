const express = require('express');
const router = express.Router();

// Import các router khác
const userRoutes = require('./user.router');
const tourRoutes = require('./tour.router');
const bookingRoutes = require('./booking.router');
const cartRoutes = require('./cart.router');
const notificationRoutes = require('./notification.router');
const paymentRoutes = require('./payment.router');
const promotionRoutes = require('./promotion.router');
const refundRoutes = require('./refund.router');
const reviewRoutes = require('./review.router');

// Định nghĩa các router chính
router.use('/users', userRoutes);
router.use('/tours', tourRoutes);
router.use('/bookings', bookingRoutes);
router.use('/carts', cartRoutes);
router.use('/notifications', notificationRoutes);
router.use('/payments', paymentRoutes);
router.use('/promotions', promotionRoutes);
router.use('/refunds', refundRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
