const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingsController');

// Get all bookings
router.get('/', bookingController.getBookings);

// Create a new booking
router.post('/', bookingController.createBooking);

// Update an existing booking by ID
router.put('/:id', bookingController.updateBooking);

// Delete a booking by ID
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
