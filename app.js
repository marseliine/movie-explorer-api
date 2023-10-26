const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const rateLimit = require("express-rate-limit");
const routes = require("./routes");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");
const { celebrateError } = require("./middlewares/celebrateError");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
  process.env;

const allowedCors = [
  "https://praktikum.tk",
  "http://praktikum.tk",
  "http://best-movies-explorer.nomoredomainsicu.ru",
  "https://best-movies-explorer.nomoredomainsicu.ru",
  "http://localhost:3000",
  "localhost:3000",
];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("База подключена");
  });

const app = express();

const corsOptions = {
  origin: allowedCors,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);
app.use(limiter);

app.use(routes);
app.use(errorLogger);

app.use(notFound);
app.use(errors());
app.use(errorHandler);

app.use(celebrateError);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
