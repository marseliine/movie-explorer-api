const router = require("express").Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require("../controllers/movies");
const {
  createMovieValidator,
  getMovieByIdValidator,
} = require("../validation/validationRules");

router.get("/", getMovies);

router.post("/", createMovieValidator, createMovie);

router.delete("/:movieId", getMovieByIdValidator, deleteMovieById);

module.exports = router;
