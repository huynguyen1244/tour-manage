const express = require("express");
const paymentController = require("../controllers/payment.controller");

const router = express.Router();

// Các route cố định, cụ thể đặt trước
// router.post("/vnpay/create-payment", paymentController.createPaymentVNPay);
router.get("/vnpay/callback", paymentController.vnpayCallback);

// Các route có tham số động đặt sau
// router.get("/:id", paymentController.getPayment);
router.post("/", paymentController.createPayment);
// router.put("/:id", paymentController.updatePayment);
// router.delete("/:id", paymentController.deletePayment);

module.exports = router;
