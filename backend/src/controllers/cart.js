const mongoose = require('mongoose');
const Cart = require('../models/cart');

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      // If the cart exists, update it
      const itemIndex = cart.items.findIndex(item => item.productId === productId);

      if (itemIndex > -1) {
        // If the item already exists in the cart, update its quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If the item does not exist in the cart, add it
        cart.items.push({ productId, quantity });
      }
    } else {
      // If the cart does not exist, create a new one
      const newCart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
      await newCart.save();
    }

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
}
  
  