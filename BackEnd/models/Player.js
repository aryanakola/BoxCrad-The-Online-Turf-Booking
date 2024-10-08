const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  MobileNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Player", playerSchema);
