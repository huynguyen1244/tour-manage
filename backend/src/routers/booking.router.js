const express = require("express");
const bookingController = require("../controllers/booking.controller");

const router = express.Router();

router.get("/", bookingController.getBookings);
router.get("/:id", bookingController.getBooking);
router.post("/", bookingController.createBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
