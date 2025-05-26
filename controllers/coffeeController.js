const Coffee = require("../models/Coffee");

// GET all coffees
exports.getAllCoffees = async (req, res) => {
  try {
    const coffees = await Coffee.find();
    res.json(coffees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single coffee by ID
exports.getCoffeeById = async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id);
    if (!coffee) return res.status(404).json({ error: "Coffee not found" });
    res.json(coffee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new coffee
exports.createCoffee = async (req, res) => {
  try {
    const newCoffee = new Coffee(req.body);
    await newCoffee.save();
    res.status(201).json(newCoffee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update coffee
exports.updateCoffee = async (req, res) => {
  try {
    const coffee = await Coffee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!coffee) return res.status(404).json({ error: "Coffee not found" });
    res.json(coffee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE coffee
exports.deleteCoffee = async (req, res) => {
  try {
    const coffee = await Coffee.findByIdAndDelete(req.params.id);
    if (!coffee) return res.status(404).json({ error: "Coffee not found" });
    res.json({ message: "Coffee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
