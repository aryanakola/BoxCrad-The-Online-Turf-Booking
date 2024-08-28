const mongoose = require('mongoose');

const reviewAndRatingSchema = new mongoose.Schema({
    boxId: { type: mongoose.Schema.Types.ObjectId, ref: 'Box', required: true },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    timeStampOfReview: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReviewAndRating', reviewAndRatingSchema);
