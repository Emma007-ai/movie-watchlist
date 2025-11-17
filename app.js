// app.js — Movie Watchlist

require("dotenv").config();

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

// MongoDB connection
require("./config/db");

// Routes
const movieRoutes = require("./routes/movies");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Read form data
app.use(express.urlencoded({ extended: true }));

// Allow PUT / DELETE with ?_method= or hidden input
app.use(methodOverride("_method"));

// Landing page
app.get("/", (req, res) => {
  res.render("home");
});

// Movies routes
app.use("/movies", movieRoutes);

// 404
app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
