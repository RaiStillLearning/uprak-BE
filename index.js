const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Import routes
const coffeeRoutes = require("./routes/coffeeRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Ganti dengan URL frontend kamu
  })
); // biar bisa diakses dari frontend

app.use(express.json()); // agar req.body bisa terbaca

// Koneksi MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Route root
app.get("/", (req, res) => {
  res.send("Coffee kamu sedang diseduh king!");
});

// Routes API
app.use("/api/coffee", coffeeRoutes);
app.use("/api/cart", cartRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
});
