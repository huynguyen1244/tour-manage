const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user.model");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utility/jwt.util");

const { sendResetPasswordEmail } = require("../utility/mail.util");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ name, email, passwordHash });
    await user.save();

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.is_active) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    // Bạn có thể lưu refreshToken vào DB hoặc Redis nếu muốn kiểm soát revoke token

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: "Refresh token không được để trống" });
    }

    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    const accessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken(user);

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Refresh token không hợp lệ hoặc hết hạn" });
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    // Tạo token reset password (mã hóa hoặc dùng crypto random)
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
    await user.save();

    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/auth/reset-password/${resetToken}`;

    await sendResetPasswordEmail(email, resetLink);

    res.json({ message: "Email đặt lại mật khẩu đã được gửi" });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn",
      });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
};
