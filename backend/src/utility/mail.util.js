// // Dùng mail thật
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// const sendResetPasswordEmail = async (toEmail, resetLink) => {
//   await transporter.sendMail({
//     from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USERNAME}>`,
//     to: toEmail,
//     subject: "Đặt lại mật khẩu",
//     html: `<p>Nhấn vào liên kết sau để đặt lại mật khẩu:</p><a href="${resetLink}">${resetLink}</a>`,
//   });
// };

// module.exports = { sendResetPasswordEmail };

// Dùng mail giả lập
const nodemailer = require("nodemailer");

// Hàm khởi tạo transporter sử dụng Ethereal test account tự tạo
async function createTestTransporter() {
  // Tạo test account Ethereal (không cần đăng ký thủ công)
  let testAccount = await nodemailer.createTestAccount();

  // Tạo transporter với SMTP config của Ethereal
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
  // Tạo transporter
  const transporter = await createTestTransporter();

  // Gửi mail
  let info = await transporter.sendMail({
    from: `"Test App" <test@example.com>`, // Tên và mail giả lập
    to: toEmail,
    subject: "Đặt lại mật khẩu",
    html: `<p>Nhấn vào liên kết sau để đặt lại mật khẩu:</p><a href="${resetLink}">${resetLink}</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Link xem trước mail trên Ethereal
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
  sendResetPasswordEmail,
};
