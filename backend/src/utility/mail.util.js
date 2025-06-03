const nodemailer = require("nodemailer");
require("dotenv").config();

function createRealTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

// Gửi mail xác nhận OTP
async function sendVerificationEmail(toEmail, otpCode) {
  const transporter = createRealTransporter();

  let info = await transporter.sendMail({
    from: `"Xác thực tài khoản" <your_email@gmail.com>`,
    to: toEmail,
    subject: "Mã xác thực OTP của bạn",
    html: `
      <p>Chào bạn,</p>
      <p>Đây là mã OTP để xác thực tài khoản của bạn:</p>
      <h2>${otpCode}</h2>
      <p>Mã có hiệu lực trong 1 giờ. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
    `,
  });

  console.log("Verification email sent: %s", info.messageId);
}

// Gửi mail đặt lại mật khẩu
async function sendResetPasswordEmail(toEmail, resetLink) {
  const transporter = createRealTransporter();

  let info = await transporter.sendMail({
    from: `"Test App" <your_email@gmail.com>`,
    to: toEmail,
    subject: "Đặt lại mật khẩu",
    html: `<p>Nhấn vào liên kết sau để đặt lại mật khẩu:</p><a href="${resetLink}">${resetLink}</a>`,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};
