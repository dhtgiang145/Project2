const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60000,
  },
});
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");

const requests = mongoose.model("services");
const passport = require("passport");
const app = express();
const limit = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000,
  message: "Too many request",
});

app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json({ limit: "20kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(xss());
app.use(helmet());
app.use("/", routes);
app.use("/login", limit);
app.use(express.static("public"));
app.use(expressSession);

module.exports = app;
