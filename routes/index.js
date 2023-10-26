const router = require("express").Router();
const logout = require("./logout");
const userRoutes = require("./users");
const movieRoutes = require("./movies");
const loginRouter = require("./login");
const registerRouter = require("./register");

const { auth } = require("../middlewares/auth");

router.use("/", loginRouter);

router.use("/", registerRouter);

router.use(auth);

router.use("/", logout);

router.use("/users", userRoutes);

router.use("/movies", movieRoutes);

module.exports = router;
