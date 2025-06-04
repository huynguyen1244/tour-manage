const employeeService = require("../services/employee.service");

// Lấy danh sách nhân viên
const getAllEmployees = async (req, res, next) => {
  try {
    const filter = req.body;
    const employees = await employeeService.getAllEmployees(filter);
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

// Tạo mới nhân viên
const createEmployee = async (req, res, next) => {
  try {
    const employeeData = req.body;
    const newEmployee = await employeeService.createEmployee(employeeData);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};

// Cập nhật thông tin nhân viên
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedEmployee = await employeeService.updateEmployee(
      id,
      updateData
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Nhân viên không tồn tại" });
    }
    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

// Xóa nhân viên
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await employeeService.deleteEmployee(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Nhân viên không tồn tại" });
    }
    res.json({ message: "Nhân viên đã được xóa thành công" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
