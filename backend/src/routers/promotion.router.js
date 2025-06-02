const express = require("express");
const promotionController = require("../controllers/promotion.controller");
const { verifyToken } = require("../middlewares/authenticate.middleware");
const {
  authorization,
  RoleManager,
} = require("../middlewares/manager.middleware");

const router = express.Router();

// Ai cũng xem được
router.get("/", promotionController.getPromotions);
router.get("/:id", promotionController.getPromotion);

// Chỉ admin, manager mới tạo, sửa, xóa
router.post(
  "/",
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager),
  promotionController.createPromotion
);
router.put(
  "/:id",
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager),
  promotionController.updatePromotion
);
router.delete(
  "/:id",
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager),
  promotionController.deletePromotion
);

module.exports = router;
