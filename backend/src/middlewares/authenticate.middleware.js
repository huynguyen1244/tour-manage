const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Khai báo trực tiếp secret key
const jwtSecret = process.env.JWT_SECRET_USER;
const jwtSecretManager = process.env.JWT_SECRET_MANAGER;

// Gán cờ isAdmin cho route admin/manager
const isManager = (req, res, next) => {
  req.isAdmin = true;
  next();
};

// Xác thực JWT
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Bạn chưa đăng nhập" });
    }

    const secret = req.isAdmin ? jwtSecretManager : jwtSecret;
    const payload = jwt.verify(token, secret);

    const userData = await User.findOne({
      where: { id: payload.id, email: payload.email },
      attributes: { exclude: ["passwordHash"] },
    });

    if (!userData || !userData.isActive) {
      return res.status(401).json({ message: "Tài khoản không hợp lệ" });
    }

    req.user = userData;
    next();
  } catch (err) {
    console.error("Lỗi xác thực:", err);
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

module.exports = {
  isManager,
  verifyToken,
};
