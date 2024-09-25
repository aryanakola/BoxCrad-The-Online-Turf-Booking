const mongoose = require("mongoose");

const reviewAndRatingSchema = new mongoose.Schema({
  boxId: { type: mongoose.Schema.Types.ObjectId, ref: "Box", required: true },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true, maxlength: 500 },
  timeStampOfReview: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ReviewAndRating", reviewAndRatingSchema);
