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
router.use(verifyToken);

router.get(
  "/",
  isManager,
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager, RoleManager.staff),
  bookingController.getBookings
);
router.get("/:id", verifyToken, bookingController.getBooking);

router.post("/", verifyToken, bookingController.createBooking);
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

module.exports = router;
