// models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  genre: {
    type: String,
    trim: true,
  },

  // Year the story is set in
  year: {
    type: Number,
  },

  rating: {
    type: Number,
    min: 0,
    max: 10,
  },

  watched: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["Plan to Watch", "Watching", "Completed", "Dropped"],
    default: "Plan to Watch",
  },

  director: {
    type: String,
    trim: true,
  },

  runtimeMinutes: {
    type: Number,
    min: 0,
  },

  language: {
    type: String,
    trim: true,
  },

  platform: {
    type: String,
    trim: true, // Netflix, Cinema, etc.
  },

  imdbUrl: {
    type: String,
    trim: true,
  },

  favorite: {
    type: Boolean,
    default: false,
  },

  notes: {
    type: String,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
