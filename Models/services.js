const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  service: {
    type: String,
    trim: true,
  },
  requestdate: {
    type: Date,
  },
  bookingdate: {
    type: Date,
  },
  comments:{
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

requestSchema.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model("services", requestSchema);
