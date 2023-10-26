const { celebrate, Segments } = require("celebrate");
const Joi = require("joi");
const {
  nameSchema,
  emailSchema,
  passwordSchema,
  nameMovieSchema,
  linkSchema,
  numberMovieSchema,
  descriptionSchema,
  countryMovieSchema,
  directorMovieSchema,
  yearMovieSchema,
} = require("./joiSchemas");
// eslint-disable-next-line import/order
const { ObjectId } = require("mongoose").Types;

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: countryMovieSchema,
    director: directorMovieSchema,
    duration: numberMovieSchema,
    year: yearMovieSchema,
    description: descriptionSchema,
    image: linkSchema,
    trailerLink: linkSchema,
    thumbnail: linkSchema,
    movieId: numberMovieSchema,
    nameRU: nameMovieSchema,
    nameEN: nameMovieSchema,
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: nameSchema,
    email: emailSchema,
  }),
});

const getUserByIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!ObjectId.isValid(value)) {
          return helpers.message("Некорректный id пользователя");
        }
        return value;
      }),
  }),
});

const getMovieByIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!ObjectId.isValid(value)) {
          return helpers.message("Некорректный id карточки");
        }
        return value;
      }),
  }),
});

module.exports = {
  getUserByIdValidator,
  createUserValidator,
  updateUserValidator,
  createMovieValidator,
  getMovieByIdValidator,
};
