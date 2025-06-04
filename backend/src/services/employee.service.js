const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const getAllEmployees = async (filter = {}) => {
  let query = {};

  if (filter.name) {
    query.name = { $regex: filter.name, $options: "i" }; // tìm theo tên, không phân biệt hoa thường
  }

  if (filter.email) {
    query.email = { $regex: filter.email, $options: "i" };
  }

  if (filter.phone) {
    query.phone = { $regex: filter.phone, $options: "i" };
  }

  if (filter.role) {
    query.role = { $regex: filter.role, $options: "i" };
  } else {
    query.role = { $ne: "customer" }; // loại trừ admin
  }

  return await User.find(query).select("-password_hash");
};

const createEmployee = async (employeeData) => {
  const passwordHash = await bcrypt.hash(employeeData.password, 10);

  const newEmployee = new User({
    ...employeeData,
    password_hash: passwordHash,
    is_active: true, // Mặc định là active
  });

  return await newEmployee.save();
};

const updateEmployee = async (id, updateData) => {
  // Lấy thông tin user hiện tại
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }

  // Nếu có thay đổi mật khẩu, mã hóa lại
  if (updateData.password) {
    updateData.password_hash = await bcrypt.hash(updateData.password, 10);
  }
  // Nếu là admin và đang cố thay đổi role
  if (
    existingUser.role === "admin" &&
    updateData.role &&
    updateData.role !== "admin"
  ) {
    throw new Error("Cannot change role of an admin");
  }

  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEmployee = async (id) => {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }

  if (existingUser.role === "admin") {
    throw new Error("Cannot delete an admin account");
  }

  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
