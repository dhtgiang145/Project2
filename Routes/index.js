const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const auth = require("http-auth");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const router = express.Router();
const requests = mongoose.model("services");
const bcrypt = require("bcrypt");
const connectEnsureLogin = require("connect-ensure-login");
const app = require("../app");

const basic = auth.basic({
  file: path.join(__dirname, "../users.htpasswd"),
});

// ROUTES to navigation items
router.get("/", function (req, res) {
  res.render("profile", { title: "Dzink Profile" });
});

router.get("/gallery", function (req, res) {
  res.render("gallery", { title: "Photo Gallery" });
});

router.get("/services", function (req, res) {
  res.render("services", { title: "Services Request" });
});

router.get("/thankyou", function (req, res) {
  res.render("thankyou", { title: "Thank you page" });
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
      requests.register(
        new requests({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          service: req.body.service,
          requestdate: req.body.requestdate,
          bookingdate: req.body.requestdate,
          comments: req.body.comments,
          username: req.body.email,
        }),
        req.body.password,
        function (err, user) {
          if (err) {
            console.log(err);
            res.render("services", { user: user });
          }
          passport.authenticate("local", { failureRedirect: "/services" })(
            req,
            res,
            function () {
              res.redirect("/thankyou");
            }
          );
        }
      );
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

// passport local authentication registered users
passport.use(
  new LocalStrategy({ usernameField: "email" }, requests.authenticate())
);
passport.serializeUser(requests.serializeUser());
passport.deserializeUser(requests.deserializeUser());

router.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" });
});

router.post(
  "/login",
  // wrap passport.authenticate call in a middleware function
  function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate("local", function (error, user, info) {
      console.log(error);
      console.log(user);
      console.log(info);

      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        return res.redirect("/login?info=" + info);
      } else {
        next();
      }
      res.status(401).send(info);
    })(req, res);
  },
  // function to call once successfully authenticated
  function (req, res) {
    res.render("yourstatus", { title: "Your Status" });
  }
);

router.get("/yourstatus", function (req, res) {
  res.render("yourstatus", { title: "Check your status", user: req.user});
});

router.get("/logout", (req, res) => {
  req.logout();
  res.render("logout", { title: "Logout Page" });
});

module.exports = router;
