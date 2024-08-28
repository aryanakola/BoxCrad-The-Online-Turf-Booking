const ReviewAndRating = require('../models/ReviewAndRating');

// Get all reviews and ratings
exports.getReviewsAndRatings = async (req, res) => {
    try {
        const reviewsAndRatings = await ReviewAndRating.find();
        res.json(reviewsAndRatings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get review and rating by ID
exports.getReviewAndRatingById = async (req, res) => {
    try {
        const reviewAndRating = await ReviewAndRating.findById(req.params.id);
        if (!reviewAndRating) return res.status(404).json({ message: 'Review and Rating not found' });
        res.json(reviewAndRating);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new review and rating
exports.createReviewAndRating = async (req, res) => {
    try {
        const newReviewAndRating = new ReviewAndRating(req.body);
        const savedReviewAndRating = await newReviewAndRating.save();
        res.status(201).json(savedReviewAndRating);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update review and rating
exports.updateReviewAndRating = async (req, res) => {
    try {
        const updatedReviewAndRating = await ReviewAndRating.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReviewAndRating) return res.status(404).json({ message: 'Review and Rating not found' });
        res.json(updatedReviewAndRating);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete review and rating
exports.deleteReviewAndRating = async (req, res) => {
    try {
        const deletedReviewAndRating = await ReviewAndRating.findByIdAndDelete(req.params.id);
        if (!deletedReviewAndRating) return res.status(404).json({ message: 'Review and Rating not found' });
        res.json({ message: 'Review and Rating deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
