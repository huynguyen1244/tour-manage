// routes/tour.routes.js
const express = require("express");
const tourController = require("../controllers/tour.controller");
const {
  verifyToken,
  isManager,
} = require("../middlewares/authenticate.middleware");
const {
  authorization,
  RoleManager,
} = require("../middlewares/manager.middleware");

const router = express.Router();

router.get("/", tourController.getAllTours);
router.get("/:id", tourController.getTourById);

router.use(isManager);
router.use(verifyToken);
router.use(
  authorization(RoleManager.admin, RoleManager.manager, RoleManager.staff)
);

router.post("/", tourController.createTour);
router.put("/:id", tourController.updateTour);
router.delete("/:id", tourController.deleteTour);

module.exports = router;
