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

module.exports = router;
