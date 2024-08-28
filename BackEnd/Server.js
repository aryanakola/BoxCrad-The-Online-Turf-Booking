const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Importing routes
const ownerRoutes = require('./routes/Owner');
const playerRoutes = require('./routes/Player');
const boxRoutes = require('./routes/Box');
const bookingRoutes = require('./routes/Bookings');
const reviewAndRatingRoutes = require('./routes/ReviewAndRating');

// Middleware
app.use(express.json());

// Use routes
app.use('/api/owners', ownerRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/boxes', boxRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews-and-ratings', reviewAndRatingRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/BoxCrad', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
