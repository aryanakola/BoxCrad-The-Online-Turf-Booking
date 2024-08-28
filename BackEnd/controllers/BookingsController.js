const Booking = require('../models/Bookings');

// Get all bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new booking

exports.createBooking = async (req, res) => {
    try {
        const { boxId, Bookings } = req.body;

        // Loop through each booking in the request to check for conflicts
        for (const booking of Bookings) {
            const { reservationDate, timingFrom, timingTo, turfId } = booking;

            // Convert timingFrom and timingTo to Date objects
            const fromTime = new Date(`${reservationDate}T${timingFrom}:00Z`);
            const toTime = new Date(`${reservationDate}T${timingTo}:00Z`);

            // Query to check if there are any conflicting bookings
            const conflictingBooking = await Booking.findOne({
                boxId: boxId,
                'Bookings.turfId': turfId,
                'Bookings.reservationDate': reservationDate,
                $or: [
                    { 'Bookings.timingFrom': { $lt: timingTo, $gte: timingFrom } },
                    { 'Bookings.timingTo': { $gt: timingFrom, $lte: timingTo } },
                    { 'Bookings.timingFrom': { $lte: timingFrom }, 'Bookings.timingTo': { $gte: timingTo } }
                ]
            });

            if (conflictingBooking) {
                return res.status(409).json({ message: 'The box is already booked for the selected time slot.' });
            }
        }

        // If no conflicts, proceed with booking creation
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Update booking
exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

