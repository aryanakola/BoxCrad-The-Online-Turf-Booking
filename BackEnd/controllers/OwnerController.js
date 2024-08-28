const Owner = require('../models/Owner');

// Get all owners
exports.getOwners = async (req, res) => {
    try {
        const owners = await Owner.find();
        res.json(owners);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get owner by ID
exports.getOwnerById = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id);
        if (!owner) return res.status(404).json({ message: 'Owner not found' });
        res.json(owner);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new owner
exports.createOwner = async (req, res) => {
    try {
        const newOwner = new Owner(req.body);
        const savedOwner = await newOwner.save();
        res.status(201).json(savedOwner);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update owner
exports.updateOwner = async (req, res) => {
    try {
        const updatedOwner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOwner) return res.status(404).json({ message: 'Owner not found' });
        res.json(updatedOwner);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete owner
exports.deleteOwner = async (req, res) => {
    try {
        const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
        if (!deletedOwner) return res.status(404).json({ message: 'Owner not found' });
        res.json({ message: 'Owner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
