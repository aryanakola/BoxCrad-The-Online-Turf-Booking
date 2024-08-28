const express = require('express');
const router = express.Router();
const playerController = require('../controllers/PlayerController');

// Get all players
router.get('/', playerController.getPlayers);

// Create a new player
router.post('/', playerController.createPlayer);

// Update an existing player by ID
router.put('/:id', playerController.updatePlayer);

// Delete a player by ID
router.delete('/:id', playerController.deletePlayer);

module.exports = router;
