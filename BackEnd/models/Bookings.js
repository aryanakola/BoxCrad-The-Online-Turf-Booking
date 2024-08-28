const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    playerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    boxId: { type: mongoose.Schema.Types.ObjectId, ref: 'Box', required: true },
    bookingDate: { type: Date, required: true },
    totalPaid: { type: Number, required: true },
    Bookings: [{
        turfId: { type: mongoose.Schema.Types.ObjectId, ref: 'Box.turfs', required: true },
        reservationDate: { type: Date, required: true },
        timingFrom: { type: String, required: true },
        timingTo: { type: String, required: true },
        duration: { type: Number, required: true },
        pricePerHour: { type: Number, required: true },
        pricePaid: { type: Number, required: true }
    }]
});

module.exports = mongoose.model('Booking', bookingSchema);
