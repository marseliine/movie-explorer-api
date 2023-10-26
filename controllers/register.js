const bcrypt = require("bcrypt");
const User = require("../models/user");
const UnauthorizedError = require("../errors/unauthorizedError");
const ConflictError = require("../errors/сonflictError");

const SALT_ROUNDS = 10;
const createUser = (req, res, next) => {
  const { name = "Жак-Ив Кусто", email, password } = req.body;
  if (!email || !password) {
    throw new UnauthorizedError("Не передан email или пароль");
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError("Пользователь уже существует");
      }
      return bcrypt.hash(password, SALT_ROUNDS, function (err, hash) {
        return User.create({
          name,
          email,
          password: hash,
        }).then((userData) => {
          return res.status(201).send({
            name: userData.name,
            email: userData.email,
          });
        });
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
};
