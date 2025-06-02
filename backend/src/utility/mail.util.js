const nodemailer = require("nodemailer");

// Hàm khởi tạo transporter sử dụng Ethereal test account tự tạo
async function createTestTransporter() {
  let testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

// Gửi mail reset password dùng Ethereal
async function sendResetPasswordEmail(toEmail, resetLink) {
  const transporter = await createTestTransporter();

  let info = await transporter.sendMail({
    from: `"Test App" <test@example.com>`,
    to: toEmail,
    subject: "Đặt lại mật khẩu",
    html: `<p>Nhấn vào liên kết sau để đặt lại mật khẩu:</p><a href="${resetLink}">${resetLink}</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// Gửi mail xác nhận email dùng Ethereal
async function sendVerificationEmail(toEmail, verifyLink) {
  const transporter = await createTestTransporter();

  let info = await transporter.sendMail({
    from: `"Test App" <test@example.com>`,
    to: toEmail,
    subject: "Xác nhận địa chỉ email của bạn",
    html: `
      <p>Chào bạn,</p>
      <p>Vui lòng nhấn vào link bên dưới để xác nhận email và kích hoạt tài khoản của bạn:</p>
      <a href="${verifyLink}">${verifyLink}</a>
      <p>Link có hiệu lực trong 1 giờ.</p>
    `,
  });

  console.log("Verification email sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
  sendResetPasswordEmail,
  sendVerificationEmail,
};
