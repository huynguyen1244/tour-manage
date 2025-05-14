const cartService = require("../services/cart.service");

const getCarts = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const carts = await cartService.getAllCarts();
    await session.commitTransaction();

    res.json(carts);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const getCart = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const cart = await cartService.getCartById(req.params.id);
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    await session.commitTransaction();

    res.json(cart);
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
    const newCart = await cartService.createCart(req.body);
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
    const updatedCart = await cartService.updateCart(req.params.id, req.body);
    if (!updatedCart) return res.status(404).json({ error: "Cart not found" });
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
    const deleted = await cartService.deleteCart(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Cart not found" });
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
  getCart,
  createCart,
  updateCart,
  deleteCart,
};
