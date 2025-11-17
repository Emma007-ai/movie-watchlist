// routes/movies.js
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// LIST: GET /movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ createdAt: -1 });
    res.render("movies", { movies });
  } catch (err) {
    res.status(500).send("Error fetching movies: " + err.message);
  }
});

// NEW: GET /movies/new
router.get("/new", (req, res) => {
  res.render("new");
});

// CREATE: POST /movies
router.post("/", async (req, res) => {
  try {
    // console.log("CREATE BODY:", req.body); // uncomment to debug

    await Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year || null,
      rating: req.body.rating || null,
      watched: req.body.watched === "on",

      status: req.body.status || "Plan to Watch",
      director: req.body.director,
      runtimeMinutes: req.body.runtimeMinutes || null,
      language: req.body.language,
      platform: req.body.platform,
      imdbUrl: req.body.imdbUrl,
      favorite: req.body.favorite === "on",
      notes: req.body.notes,
    });

    res.redirect("/movies");
  } catch (err) {
    res.status(500).send("Error creating movie: " + err.message);
  }
});

// SHOW: GET /movies/:id
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.render("show", { movie });
  } catch (err) {
    res.status(500).send("Error fetching movie: " + err.message);
  }
});

// EDIT FORM: GET /movies/:id/edit
router.get("/:id/edit", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.render("edit", { movie });
  } catch (err) {
    res.status(500).send("Error loading edit form: " + err.message);
  }
});

// UPDATE: PUT /movies/:id
router.put("/:id", async (req, res) => {
  try {
    // console.log("UPDATE BODY:", req.body); // uncomment to debug

    await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year || null,
        rating: req.body.rating || null,
        watched: req.body.watched === "on",

        status: req.body.status || "Plan to Watch",
        director: req.body.director,
        runtimeMinutes: req.body.runtimeMinutes || null,
        language: req.body.language,
        platform: req.body.platform,
        imdbUrl: req.body.imdbUrl,
        favorite: req.body.favorite === "on",
        notes: req.body.notes,
      },
      { runValidators: true }
    );

    res.redirect("/movies");
  } catch (err) {
    res.status(500).send("Error updating movie: " + err.message);
  }
});

// DELETE: DELETE /movies/:id
router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (err) {
    res.status(500).send("Error deleting movie: " + err.message);
  }
});

module.exports = router;
