const express = require("express");
const paymentController = require("../controllers/payment.controller");

const router = express.Router();

router.get("/", paymentController.getPayments);
router.get("/:id", paymentController.getPayment);
router.post("/", paymentController.createPayment);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
