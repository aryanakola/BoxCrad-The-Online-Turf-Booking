const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        locality: { type: String, required: true },
        road: { type: String, required: true },
        city: { type: String, required: true },
        taluka: { type: String, required: true },
        district: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
    },
    addressLink: { type: String },
    turfs: [{
        turfId: { type: mongoose.Schema.Types.ObjectId, required: true },
        turfName: { type: String, required: true },
        dimension: {
            length: { type: String, required: true },
            breadth: { type: String, required: true },
            height: { type: String, required: true }
        },
        pricePerHour: { type: Number, required: true },
        playerCapacity: { type: Number, required: true },
        photos: { type: [String] },
        typeOfTurf: { type: String, required: true }
    }],
    timeAndHoliday: {
        mTof: { type: String, required: true },
        saturday: { type: String, required: true },
        sunday: { type: String, required: true }
    }
});

module.exports = mongoose.model('Box', boxSchema);
