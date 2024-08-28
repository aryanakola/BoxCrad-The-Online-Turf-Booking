const Box = require('../models/Box');
const Booking  = require('../models/Bookings');

// Get all boxes
exports.getBoxes = async (req, res) => {
    try {
        const boxes = await Box.find();
        res.json(boxes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get box by ID
exports.getBoxById = async (req, res) => {
    try {
        const box = await Box.findById(req.params.id);
        if (!box) return res.status(404).json({ message: 'Box not found' });
        res.json(box);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new box
exports.createBox = async (req, res) => {
    try {
        const { name, ownerId } = req.body;

        // Check if a box with the same name and owner already exists
        const existingBox = await Box.findOne({ name, ownerId });
        if (existingBox) {
            return res.status(400).json({ message: 'A box with this name already exists, please choose another name' });
        }

        // Create new box
        const newBox = new Box(req.body);
        await newBox.save();
        res.status(201).json(newBox);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Update box
exports.updateBox = async (req, res) => {
    try {
        const updatedBox = await Box.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBox) return res.status(404).json({ message: 'Box not found' });
        res.json(updatedBox);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete box
exports.deleteBox = async (req, res) => {
    try {
        const deletedBox = await Box.findByIdAndDelete(req.params.id);
        if (!deletedBox) return res.status(404).json({ message: 'Box not found' });
        res.json({ message: 'Box deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.filterBoxes = async (req, res) => {
    try {
        const { price, timeSlot, reservationDate } = req.query;

        let filteredBoxes;

        // Handle only price filter
        if (price && !timeSlot && !reservationDate) {
            filteredBoxes = await Box.find({
                'turfs.pricePerHour': { $lte: price }
            });
        }
        // Handle only timeSlot and reservationDate filter
        else if (timeSlot && reservationDate && !price) {
            const [timingFrom, timingTo] = timeSlot.split('-').map(time => time.trim());

            // Convert reservationDate to a Date object
            const formattedReservationDate = new Date(reservationDate);

            const conflictingBookings = await Booking.find({
                'Bookings.reservationDate': formattedReservationDate,
                $or: [
                    { 'Bookings.timingFrom': { $lt: timingTo }, 'Bookings.timingTo': { $gt: timingFrom } }
                ]
            }).select('boxId');

            const conflictingBoxIds = conflictingBookings.map(booking => booking.boxId);

            filteredBoxes = await Box.find({
                _id: { $nin: conflictingBoxIds }
            });
        }
        // Handle both filters
        else if (price && timeSlot && reservationDate) {
            const [timingFrom, timingTo] = timeSlot.split('-').map(time => time.trim());

            // Convert reservationDate to a Date object
            const formattedReservationDate = new Date(reservationDate);

            const conflictingBookings = await Booking.find({
                'Bookings.reservationDate': formattedReservationDate,
                $or: [
                    { 'Bookings.timingFrom': { $lt: timingTo }, 'Bookings.timingTo': { $gt: timingFrom } }
                ]
            }).select('boxId');

            const conflictingBoxIds = conflictingBookings.map(booking => booking.boxId);

            filteredBoxes = await Box.find({
                _id: { $nin: conflictingBoxIds },
                'turfs.pricePerHour': { $lte: price }
            });
        } else {
            // If no filters are provided, return all boxes
            filteredBoxes = await Box.find();
        }

        res.json(filteredBoxes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
