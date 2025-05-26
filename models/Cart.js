const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    coffeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coffee", // Harus sama dengan model name Coffee
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    collection: "carts", // koreksi dari collation jadi collection
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", CartSchema);
