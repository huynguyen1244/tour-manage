const express = require("express");
const refundController = require("../controllers/refund.controller");

const router = express.Router();

router.get("/", refundController.getRefunds);
router.get("/:id", refundController.getRefund);
router.post("/", refundController.createRefund);
router.put("/:id", refundController.updateRefund);
router.delete("/:id", refundController.deleteRefund);

module.exports = router;
