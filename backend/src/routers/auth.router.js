const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/authenticate.middleware");

// Đăng ký
router.post("/register", auth.register);
router.post("/verify-otp", auth.verifyOtp);
// Đăng nhập
router.post("/login", auth.login);
router.post("/logout", (req, res) => {
  // Xóa cookie chứa token JWT
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  // Nếu dùng session
  // req.session.destroy(err => {
  //   if(err) return res.status(500).send('Logout error');
  //   res.send('Logout successful');
  // });

  res.status(200).json({ message: "Logout successful" });
});
router.post("/verify-token", auth.verifyToken);
// Làm mới access token bằng refresh token
router.post("/refresh-token", auth.refreshToken);

// Các API phát triển sau khi đăng nhập
router.put("/change-password", verifyToken, auth.changePassword);

// Gửi email quên mật khẩu
router.post("/forgot-password", auth.forgotPassword);

// Đặt lại mật khẩu bằng token
router.post("/reset-password/:token", auth.resetPassword);

module.exports = router;
