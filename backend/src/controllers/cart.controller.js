const cartService = require("../services/cart.service");
const mongoose = require("mongoose");

const getCarts = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_id = req.user.id;

    const carts = await cartService.getAllCarts(user_id);
    await session.commitTransaction();

    res.json(carts);
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const createCart = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_id = req.user.id;
    const tour_id = req.params.id;
    const newCart = await cartService.createCart(user_id, tour_id, req.body);
    await session.commitTransaction();

    res.status(201).json(newCart);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const updateCart = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_id = req.user.id;

    const updatedCart = await cartService.updateCart(
      req.params.id,
      user_id,
      req.body
    );

    if (!updatedCart) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Cart not found or unauthorized" });
    }

    await session.commitTransaction();
    res.json(updatedCart);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const deleteCart = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_id = req.user.id;

    const deleted = await cartService.deleteCart(req.params.id, user_id);

    if (!deleted) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Cart not found or unauthorized" });
    }

    await session.commitTransaction();
    res.json({ message: "Cart deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getCarts,
  createCart,
  updateCart,
  deleteCart,
};
