const RoleManager = {
  admin: "admin",
  manager: "manager",
  staff: "staff",
};

const authorization = (roles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Người dùng chưa xác thực" });
      }

      // Admin luôn có quyền truy cập
      if (user.role === RoleManager.admin) {
        return next();
      }

      // Kiểm tra role có nằm trong danh sách cho phép không
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Không có quyền truy cập" });
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({ message: "Lỗi xác thực vai trò" });
    }
  };
};

module.exports = {
  authorization,
  RoleManager,
};
