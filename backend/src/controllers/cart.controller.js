const cartService = require('../services/cart.service');

const getCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.id);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createCart(req.body);
    res.status(201).json(newCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await cartService.updateCart(req.params.id, req.body);
    if (!updatedCart) return res.status(404).json({ error: 'Cart not found' });
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const deleted = await cartService.deleteCart(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Cart not found' });
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart
};
