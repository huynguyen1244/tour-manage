const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user.model");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utility/jwt.util");

const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utility/mail.util");
const otpStore = require("../utility/otp-store"); // Giả sử bạn có một utility để lưu trữ OTP tạm thời

// api đăng ký người dùng
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password_hash: passwordHash });
    await user.save();

    // Sinh mã OTP 6 số
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 phút
    });

    await sendVerificationEmail(email, otp);

    res.status(201).json({
      message:
        "Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản.",
    });
  } catch (error) {
    next(error);
  }
};

// api xác minh OTP
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Người dùng không tồn tại" });

    const data = otpStore.get(email);
    if (!data || data.otp !== otp || data.expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP không đúng hoặc đã hết hạn" });
    }

    user.is_active = true;
    await user.save();
    otpStore.delete(email); // xoá OTP sau khi dùng

    res.json({ message: "Tài khoản đã được xác minh thành công." });
  } catch (error) {
    next(error);
  }
};

// api đăng nhập người dùng
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

// api làm mới access token bằng refresh token
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

// api đổi mật khẩu
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "Người dùng không tồn tại" });

    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
    }

    user.password_hash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    next(error);
  }
};

// api gửi email quên mật khẩu
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

// api đặt lại mật khẩu bằng token
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
  changePassword,
  forgotPassword,
  resetPassword,
  verifyOtp,
};
