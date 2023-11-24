const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  phoneNumber: String,
  isActive: Boolean,
  createdOn: Date,
  country: String,
  loginPassword: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;