const express = require("express");
const paymentController = require("../controllers/payment.controller");

const router = express.Router();

router.post("/", paymentController.createPayment);
router.get("/callback", paymentController.vnpayCallback);
router.post("/refund", paymentController.refundPayment);

module.exports = router;
