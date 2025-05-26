const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

// GET all cart items with coffee details
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("coffeeId");
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single cart item by cart id
router.get("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id).populate("coffeeId");
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
