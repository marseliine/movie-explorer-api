const Joi = require("joi");

const regexLink = /^https?:\/\/[a-z\d.-]+\.[a-z]{2,}(?:\/.*)*$/i;
const nameSchema = Joi.string().min(2).max(30);
const emailSchema = Joi.string().email().required();

const passwordSchema = Joi.string().required();
const nameMovieSchema = Joi.string().required();
const countryMovieSchema = Joi.string().required();
const directorMovieSchema = Joi.string().required();
const yearMovieSchema = Joi.string().required();
const descriptionSchema = Joi.string().required();

const numberMovieSchema = Joi.number().required();

const linkSchema = Joi.string()
  .uri({ scheme: ["http", "https"] })
  .regex(regexLink)
  .required();

module.exports = {
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
};
