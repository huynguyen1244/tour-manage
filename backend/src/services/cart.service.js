const Cart = require('../models/cart.model');

const getAllCarts = async () => {
  return await Cart.find().populate('user_id tour_id');
};

const getCartById = async (id) => {
  return await Cart.findById(id).populate('user_id tour_id');
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
  getCartById,
  createCart,
  updateCart,
  deleteCart
};
