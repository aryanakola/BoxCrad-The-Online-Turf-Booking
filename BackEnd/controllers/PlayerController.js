const Player = require('../models/Player');

// Get all players
exports.getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get player by ID
exports.getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new player
exports.createPlayer = async (req, res) => {
    try {
        const newPlayer = new Player(req.body);
        const savedPlayer = await newPlayer.save();
        res.status(201).json(savedPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update player
exports.updatePlayer = async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlayer) return res.status(404).json({ message: 'Player not found' });
        res.json(updatedPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete player
exports.deletePlayer = async (req, res) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) return res.status(404).json({ message: 'Player not found' });
        res.json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
