const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  MobileNumber: { type: String, required: true, unique: true },
  ownedBox: [{ type: mongoose.Schema.Types.ObjectId, ref: "Box" }],
});

module.exports = mongoose.model("Owner", ownerSchema);
