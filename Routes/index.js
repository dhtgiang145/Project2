const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const auth = require("http-auth");

const router = express.Router();
const requests = mongoose.model("services");

router.get("/", function (req, res) {
  res.render("profile", { title: "Dzink Profile" });
});

router.get("/gallery", function (req, res) {
  res.render("gallery", { title: "Photo Gallery" });
});

router.get("/services", function (req, res) {
  res.render("services", { title: "Services Request" });
});

router.get("/admin", function (req, res) {
  res.render("admin", { title: "Admin Page" });
});

module.exports = router;
