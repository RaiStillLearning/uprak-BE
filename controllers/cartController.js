const mongoose = require("mongoose");
const Cart = require("../models/Cart");

// GET all carts (populate coffee)
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("coffeeId");
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single cart by ID
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("coffeeId");
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST add to cart or update quantity
exports.addToCart = async (req, res) => {
  try {
    const { coffeeId, quantity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(coffeeId)) {
      return res.status(400).json({ error: "Invalid coffeeId" });
    }
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: "Quantity harus minimal 1" });
    }
    let cart = await Cart.findOne({ coffeeId });
    if (cart) {
      cart.quantity += quantity;
    } else {
      cart = new Cart({ coffeeId, quantity });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update cart quantity
exports.updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: "Quantity harus minimal 1" });
    }
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE cart item
exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
