const express = require('express');
const router = express.Router();
const { getAllGenres, createGenre, getSingleGenre, updateGenre, deleteGenre } = require('../controllers/genreController');

router
    .get("/list", getAllGenres)
    .post("/create", createGenre)
    .get("/:id", getSingleGenre)
    .put("/update/:id", updateGenre)
    .delete("/delete/:id", deleteGenre)

module.exports = { genreRouter: router };