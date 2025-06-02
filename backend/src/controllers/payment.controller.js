const VNPayService = require("../services/payment/vnpay.payment");
const paymentService = require("../services/payment.service");

class PaymentController {
  /**
   * Tạo yêu cầu thanh toán VNPay
   */
  static async createPayment(req, res) {
    try {
      const { amount, orderId, orderInfo, ipAddr, bankCode, locale } = req.body;

      if (!amount || !orderId || !orderInfo) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin thanh toán cho VNPay",
        });
      }

      // Gọi service tạo URL thanh toán VNPay
      const paymentUrl = VNPayService.createPaymentUrl({
        amount,
        orderId,
        orderInfo,
        ipAddr: ipAddr || req.ip || "127.0.0.1",
        bankCode,
        locale,
      });

      return res.status(200).json({
        success: true,
        data: { redirectUrl: paymentUrl },
      });
    } catch (error) {
      console.error("VNPay create payment error:", error);
      return res.status(500).json({
        success: false,
        message: `Lỗi khi tạo thanh toán VNPay: ${
          error.message || "Không xác định"
        }`,
      });
    }
  }

  /**
   * Xử lý callback từ VNPay
   */
  static async vnpayCallback(req, res) {
    try {
      const vnpParams = req.query;
      const isValid = VNPayService.verifyReturnUrl(vnpParams);
      const orderId = vnpParams.vnp_TxnRef; // giữ nguyên string hoặc convert tuỳ bạn

      if (isValid) {
        // Cập nhật trạng thái payment thành completed
        await paymentService.updatePaymentStatus(orderId, "completed");

        // Có thể thêm xử lý logic đơn hàng ở đây nếu cần

        return res.redirect(
          `http://localhost:3000/payment-success?orderId=${orderId}`
        );
      } else {
        await paymentService.updatePaymentStatus(orderId, "failed");
        return res.redirect(
          `http://localhost:3000/payment-failed?orderId=${orderId}`
        );
      }
    } catch (error) {
      console.error("VNPay callback error:", error);
      return res.redirect(`http://localhost:3000/payment-failed`);
    }
  }
}

module.exports = PaymentController;
