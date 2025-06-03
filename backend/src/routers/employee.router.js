const express = require("express");
const employeeController = require("../controllers/employee.controller");

const {
  verifyToken,
  isManager,
} = require("../middlewares/authenticate.middleware");
const {
  authorization,
  RoleManager,
} = require("../middlewares/manager.middleware");

const router = express.Router();

router.use(verifyToken);
router.use(isManager);
router.use(authorization(RoleManager.admin));

// Lấy danh sách nhân viên
router.get("/", employeeController.getAllEmployees);
// Tạo mới nhân viên
router.post("/", employeeController.createEmployee);
// Cập nhật thông tin nhân viên
router.put("/:id", employeeController.updateEmployee);
// Xóa nhân viên
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
