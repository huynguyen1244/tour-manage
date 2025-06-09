const Cart = require("../models/cart.model");
const Tour = require("../models/tour.model");

const getAllCarts = async (user_id) => {
  return await Cart.find({ user_id })
    .populate({
      path: "user_id",
      select: "-password_hash", // loại bỏ password_hash từ user
    })
    .populate("tour_id");
};

const getCartByIdAndUserId = async (id, user_id) => {
  return await Cart.findOne({ _id: id, user_id });
};

const createCart = async (user_id, tour_id, data) => {
  const tour = await Tour.findById(tour_id);
  const cartData = { user_id, tour_id, total_price: tour.price, ...data };
  const newCart = new Cart({ ...cartData });
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
