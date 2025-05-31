const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

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

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const userData = await User.findOne(
      { _id: payload.id, email: payload.email },
      { passwordHash: 0 }
    );

    if (!userData || !userData.is_active) {
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
