const axios = require("axios");
const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");

const dotenv = require("dotenv");

dotenv.config();

class VNPayService {
  constructor() {
    this.config = {
      tmnCode: process.env.VNPAY_TMN_CODE,
      secretKey: process.env.VNPAY_SECRET_KEY,
      vnpUrl: process.env.VNPAY_URL,
      returnUrl: process.env.VNPAY_RETURN_URL,
    };
  }

  // Sắp xếp object theo đúng định dạng VNPay yêu cầu
  sortObject(obj) {
    let sorted = {};
    let str = [];

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }

    str.sort();

    for (let i = 0; i < str.length; i++) {
      let key = str[i];
      sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
    }

    return sorted;
  }

  // Tạo URL thanh toán VNPay
  createPaymentUrl(params) {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: this.config.tmnCode,
      vnp_Locale: params.locale || "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: params.booking_id,
      vnp_OrderInfo: params.booking_info,
      vnp_OrderType: "other",
      vnp_Amount: params.amount * 100,
      vnp_ReturnUrl: this.config.returnUrl,
      vnp_IpAddr: params.ipAddr,
      vnp_CreateDate: createDate,
    };

    if (params.bankCode) {
      vnp_Params["vnp_BankCode"] = params.bankCode;
    }

    vnp_Params = this.sortObject(vnp_Params);
    const signData = qs.stringify(vnp_Params, { encode: false });

    const hmac = crypto.createHmac("sha512", this.config.secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    vnp_Params["vnp_SecureHash"] = signed;

    const paymentUrl =
      this.config.vnpUrl + "?" + qs.stringify(vnp_Params, { encode: false });
    return paymentUrl;
  }

  // Xác minh callback từ VNPay
  verifyReturnUrl(vnpParams) {
    const secureHash = vnpParams.vnp_SecureHash;

    const verifyParams = { ...vnpParams };
    delete verifyParams.vnp_SecureHash;
    delete verifyParams.vnp_SecureHashType;

    const sortedParams = this.sortObject(verifyParams);
    const signData = qs.stringify(sortedParams, { encode: false });

    const hmac = crypto.createHmac("sha512", this.config.secretKey);
    const calculated = hmac
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex");

    return calculated === secureHash;
  }

  // Hoàn tiền qua VNPay
  async refund(params) {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");
    const requestId = moment(date).format("HHmmss");

    const transactionNo = "0";
    const OrderInfo = "Hoan tien GD ma:" + params.booking_id;

    const data = [
      requestId,
      "2.1.0",
      "refund",
      this.config.tmnCode,
      params.transType || "02",
      params.booking_id,
      params.amount * 100,
      transactionNo,
      params.transDate,
      params.user,
      createDate,
      params.ipAddr || "127.0.0.1",
      OrderInfo,
    ].join("|");

    const hmac = crypto.createHmac("sha512", this.config.secretKey);
    const secureHash = hmac.update(Buffer.from(data, "utf-8")).digest("hex");

    const refundParams = {
      vnp_RequestId: requestId,
      vnp_Version: "2.1.0",
      vnp_Command: "refund",
      vnp_TmnCode: this.config.tmnCode,
      vnp_TransactionType: params.transType || "02",
      vnp_TxnRef: params.booking_id,
      vnp_Amount: params.amount * 100,
      vnp_TransactionNo: transactionNo,
      vnp_TransactionDate: params.transDate,
      vnp_CreateBy: params.user,
      vnp_CreateDate: createDate,
      vnp_IpAddr: params.ipAddr || "127.0.0.1",
      vnp_OrderInfo: booking_info,
      vnp_SecureHash: secureHash,
    };

    try {
      const apiUrl =
        "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
      const response = await axios.post(apiUrl, refundParams, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`VNPay refund error: ${error}`);
    }
  }
}

module.exports = new VNPayService();
