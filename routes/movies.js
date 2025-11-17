// routes/movies.js
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// LIST all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ createdAt: -1 });
    res.render("movies", { movies });
  } catch (err) {
    res.status(500).send("Error fetching movies: " + err.message);
  }
});

// NEW movie form
router.get("/new", (req, res) => {
  res.render("new");
});

// CREATE movie
router.post("/", async (req, res) => {
  try {
    await Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year || null,
      rating: req.body.rating || null,
      watched: req.body.watched === "on",
    });
    res.redirect("/movies");
  } catch (err) {
    res.status(500).send("Error creating movie: " + err.message);
  }
});

// SHOW single movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.render("show", { movie });
  } catch (err) {
    res.status(500).send("Error fetching movie: " + err.message);
  }
});

// EDIT form
router.get("/:id/edit", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.render("edit", { movie });
  } catch (err) {
    res.status(500).send("Error loading edit form: " + err.message);
  }
});

// UPDATE movie
router.put("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year || null,
        rating: req.body.rating || null,
        watched: req.body.watched === "on",
      },
      { runValidators: true }
    );
    res.redirect("/movies");
  } catch (err) {
    res.status(500).send("Error updating movie: " + err.message);
  }
});

// DELETE movie
router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (err) {
    res.status(500).send("Error deleting movie: " + err.message);
  }
});

module.exports = router;
