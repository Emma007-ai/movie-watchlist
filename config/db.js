// config/db.js
const mongoose = require("mongoose");

// Load MONGO_URI (can be empty without crashing)
const MONGO_URI = process.env.MONGO_URI;

// Try connecting ONLY if MONGO_URI exists
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });
} else {
  console.log("⚠️ MONGO_URI not found — skipping MongoDB connection.");
}
