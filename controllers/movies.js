const Movie = require("../models/movie");
const NotFoundError = require("../errors/notFoundError");
const ForbiddenError = require("../errors/forbiddenError");

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  return Movie.find({ owner })
    .populate(["owner"])
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((card) => {
      return res.status(201).send(card);
    })
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  return Movie.findById(movieId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточки не существует");
      }
      if (card.owner._id.toString() !== userId.toString()) {
        throw new ForbiddenError("Нет прав для удаления карточки");
      }
      return Movie.findByIdAndDelete(movieId)
        .then((deletedCard) => {
          if (!deletedCard) {
            throw new NotFoundError("Карточки не существует");
          }
          return res.status(200).send(deletedCard);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
