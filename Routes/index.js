const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const auth = require("http-auth");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const router = express.Router();
const requests = mongoose.model("services");
const bcrypt = require("bcrypt");
const connectEnsureLogin = require("connect-ensure-login");
const app = require("../app");

const basic = auth.basic({
  file: path.join(__dirname, "../users.htpasswd"),
});

router.get("/", function (req, res) {
  res.render("profile", { title: "Dzink Profile" });
});

router.get("/gallery", function (req, res) {
  res.render("gallery", { title: "Photo Gallery" });
});

router.get("/services", function (req, res) {
  res.render("services", { title: "Services Request" });
});

router.post(
  "/",
  [
    check("name").isLength({ min: 1 }).withMessage("Please enter a name"),
    check("email").isEmail().withMessage("Please enter an email"),
    check("phone")
      .isLength({ min: 10 })
      .withMessage("Please enter a 10-digit phone number"),
    check("password")
      .matches(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      )
      .withMessage(
        "Password should contain at least 8 characters, one lowercase letter, one uppercase letter, one number and one special character"
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const request = new requests({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        service: req.body.service,
        requestdate: req.body.requestdate,
        bookingdate: req.body.requestdate,
        comments: req.body.comments,
        username: req.body.email,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      request.password = await bcrypt.hash(request.password, salt);
      request
        .save()
        .then(() => {
          res.render("thankyou", { title: "Thank You Page" });
        })
        .catch((err) => {
          console.log(err);
          res.send("Sorry! Something went wrong");
        });
    } else {
      res.render("services", {
        title: "Services Request",
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

router.get(
  "/admin",
  basic.check((req, res) => {
    requests
      .find()
      .then((requestlist) => {
        res.render("admin", {
          title: "Admin Page",
          requestlist,
        });
      })
      .catch(() => {
        res.send("Sorry! Something went wrong");
      });
  })
);

// passport local authentication
passport.use(requests.createStrategy());
passport.serializeUser(requests.serializeUser());
passport.deserializeUser(requests.deserializeUser());

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect("/services");
    }

    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/status" + user.username);
    });
  })(req, res, next);
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" });
});

router.get("/status", connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.send({ user: req.user })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.render("logout", { title: "Logout Page" });
});

module.exports = router;
