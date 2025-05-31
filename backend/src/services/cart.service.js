const Cart = require("../models/cart.model");

const getAllCarts = async (user_id) => {
  return await Cart.find({ user_id }).populate("user_id");
};

const createCart = async (cartData) => {
  const newCart = new Cart(cartData);
  return await newCart.save();
};

const updateCart = async (id, updateData) => {
  return await Cart.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCart = async (id) => {
  return await Cart.findByIdAndDelete(id);
};

module.exports = {
  getAllCarts,
  createCart,
  updateCart,
  deleteCart,
};
