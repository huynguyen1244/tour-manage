const User = require("../models/user.model");

// Lấy danh sách tất cả khách hàng với các bộ lọc
const getAllCustomers = async (filter = {}) => {
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
  return await User.find(query).select("-password_hash");
};

const blockCustomer = async (id) => {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }
  return await User.findByIdAndUpdate(id, { is_active: false }, { new: true });
};

const deleteCustomer = async (id) => {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }
  if (existingUser.role === "admin") {
    throw new Error("Cannot delete an admin account");
  }
  return await User.findByIdAndDelete(id);
};

// Lấy thông tin khách hàng theo ID
const getCustomerById = async (id) => {
  const existingUser = await User.findById(id);

  if (!existingUser) {
    throw new Error("User not found");
  }
  return existingUser;
};

// Khách hàng câp nhật thông tin cá nhân
const updateCustomer = async (id, updateData) => {
  // Lấy thông tin user hiện tại
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};
module.exports = {
  getAllCustomers,
  blockCustomer,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
};
