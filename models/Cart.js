const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    coffeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coffee",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    collection: "carts",
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", CartSchema);
