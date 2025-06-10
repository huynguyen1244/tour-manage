const express = require("express");
const bookingController = require("../controllers/booking.controller");
const {
  verifyToken,
  isManager,
} = require("../middlewares/authenticate.middleware");
const {
  authorization,
  RoleManager,
} = require("../middlewares/manager.middleware");

const router = express.Router();

// Api đưa ra các booking
router.get(
  "/",
  isManager,
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager, RoleManager.staff),
  bookingController.getBookings
);
router.get("/customer", verifyToken, bookingController.getCustomerBookings);
// Api lấy thông tin booking theo id
router.get("/:id", verifyToken, bookingController.getBooking);
router.put("/cancel/:id", verifyToken, bookingController.cancelBooking);
// Api tạo mới booking
router.post("/", verifyToken, bookingController.createBooking);
// Api cập nhật thông tin booking
router.put(
  "/:id",
  isManager,
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager, RoleManager.staff),
  bookingController.updateBooking
);
router.delete(
  "/:id",
  isManager,
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager, RoleManager.staff),
  bookingController.deleteBooking
);

router.put(
  "/update-payment/:id",
  isManager,
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager, RoleManager.staff),
  bookingController.updatePayment
);
module.exports = router;
