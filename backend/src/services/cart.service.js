const Cart = require("../models/cart.model");

const getAllCarts = async (user_id) => {
  return await Cart.find({ user_id }).populate("user_id");
};

const getCartByIdAndUserId = async (id, user_id) => {
  return await Cart.findOne({ _id: id, user_id });
};

const createCart = async (user_id, cartData) => {
  const newCart = new Cart({ ...cartData, user_id });
  return await newCart.save();
};

const updateCart = async (id, user_id, updateData) => {
  return await Cart.findOneAndUpdate({ _id: id, user_id }, updateData, {
    new: true,
  });
};

const deleteCart = async (id, user_id) => {
  return await Cart.findOneAndDelete({ _id: id, user_id });
};

module.exports = {
  getAllCarts,
  getCartByIdAndUserId,
  createCart,
  updateCart,
  deleteCart,
};
