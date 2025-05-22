const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth.controller");

// Đăng ký
router.post("/register", auth.register);

// Đăng nhập
router.post("/login", auth.login);

// Làm mới access token bằng refresh token
router.post("/refresh-token", auth.refreshToken);

// Gửi email quên mật khẩu
router.post("/forgot-password", auth.forgotPassword);

// Đặt lại mật khẩu bằng token
router.post("/reset-password/:token", auth.resetPassword);

module.exports = router;
