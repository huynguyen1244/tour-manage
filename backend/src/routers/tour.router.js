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
const { upload } = require("../utility/media");

const router = express.Router();

// public routes
router.get("/", tourController.getAllTours);
router.get("/filter", tourController.getFilter);
router.get("/:id", tourController.getTourById);

// manager routes
router.use(isManager);
router.use(verifyToken);
router.use(
  authorization(RoleManager.admin, RoleManager.manager, RoleManager.staff)
);

router.post("/", upload.any(), tourController.createTour);
router.put("/:id", upload.any(), tourController.updateTour);
router.delete("/delete-image", tourController.deleteTourImage);
router.delete("/:id", tourController.deleteTour);

module.exports = router;
