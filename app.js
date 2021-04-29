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

const requests = mongoose.model("services");
const passport = require("passport");
const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use(express.static("public"));
app.use(expressSession);

module.exports = app;