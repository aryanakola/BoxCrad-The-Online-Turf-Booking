const express = require('express');
const router = express.Router();
const reviewAndRatingController = require('../controllers/ReviewAndRatingController');

// Get all reviews and ratings
router.get('/', reviewAndRatingController.getReviewsAndRatings);

// Create a new review and rating
router.post('/', reviewAndRatingController.createReviewAndRating);

// Update an existing review and rating by ID
router.put('/:id', reviewAndRatingController.updateReviewAndRating);

// Delete a review and rating by ID
router.delete('/:id', reviewAndRatingController.deleteReviewAndRating);

module.exports = router;
