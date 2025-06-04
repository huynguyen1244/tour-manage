const VNPayService = require("../services/payment/vnpay.payment");
const paymentService = require("../services/payment.service");
const bookingService = require("../services/booking.service");

class PaymentController {
  /**
   * Tạo yêu cầu thanh toán VNPay
   */
  static async createPayment(req, res) {
    try {
      const booking_id = req.params.id;
      const booking = await bookingService.getBookingById(booking_id);
      const { ipAddr, bankCode, locale } = req.body;

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy booking với ID đã cho",
        });
      }

      // Gọi service tạo URL thanh toán VNPay
      const paymentUrl = VNPayService.createPaymentUrl({
        amount: booking.total_price,
        booking_id,
        booking_info: booking ? booking.tour_id.name : "Tour không xác định",
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

  static async refundPayment(req, res) {
    try {
      const { orderId, amountRefund, transDate, user, ipAddr } = req.body;

      if (!orderId || !amountRefund || !transDate || !user) {
        return res.status(400).json({
          success: false,
          message:
            "Thiếu thông tin bắt buộc: orderId, amountRefund, transDate hoặc user",
        });
      }

      // Gọi service refund với object đầy đủ tham số
      const refundResult = await VNPayService.refund({
        orderId,
        amount: amountRefund,
        transDate,
        user,
        ipAddr,
      });

      // Kiểm tra kết quả trả về từ VNPayService.refund
      if (refundResult && refundResult.vnp_ResponseCode === "00") {
        return res.status(200).json({
          success: true,
          message: "Hoàn tiền thành công",
          data: refundResult,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: refundResult.vnp_ResponseMessage || "Hoàn tiền thất bại",
          data: refundResult,
        });
      }
    } catch (error) {
      console.error("Refund payment error:", error);
      return res.status(500).json({
        success: false,
        message: `Lỗi khi hoàn tiền: ${error.message || "Không xác định"}`,
      });
    }
  }
}

module.exports = PaymentController;
