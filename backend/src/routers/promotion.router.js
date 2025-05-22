const express = require("express");
const promotionController = require("../controllers/promotion.controller");

const router = express.Router();

router.get("/", promotionController.getPromotions);
router.get("/:id", promotionController.getPromotion);
router.post("/", promotionController.createPromotion);
router.put("/:id", promotionController.updatePromotion);
router.delete("/:id", promotionController.deletePromotion);

module.exports = router;
