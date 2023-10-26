const User = require("../models/user");
const ConflictError = require("../errors/сonflictError");

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user._id;

  return User.findById(_id)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
};

const updateUserById = (req, res, next) => {
  const { _id, email } = req.user;
  const newUserData = req.body;

  if (newUserData.email && newUserData.email !== email) {
    // Проверяем, если новый email не совпадает с текущим email пользователя
    return User.findOne({ email: newUserData.email })
      .then((existingUser) => {
        if (existingUser && existingUser._id.toString() !== _id) {
          // Если найден другой пользователь с таким email, выбрасываем ошибку
          // конфликта
          throw new ConflictError("Пользователь с таким email уже существует");
        }
        // Обновляем данные пользователя, включая новый email
        return User.findByIdAndUpdate(_id, newUserData, {
          new: true,
          runValidators: true,
        });
      })
      .then((user) => {
        return res.status(200).send(user);
      })
      .catch(next);
  } else {
    // Если новый email не указан или совпадает с текущим email, обновляем
    // остальные данные пользователя
    return User.findByIdAndUpdate(_id, newUserData, {
      new: true,
      runValidators: true,
    })
      .then((user) => {
        return res.status(200).send(user);
      })
      .catch(next);
  }
};

module.exports = {
  updateUserById,
  getCurrentUser,
};
