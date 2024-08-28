const express = require('express');
const router = express.Router();
const boxController = require('../controllers/BoxController');

// Get all boxes
router.get('/', boxController.getBoxes);

// Create a new box
router.post('/', boxController.createBox);

// Update an existing box by ID
router.put('/:id', boxController.updateBox);

// Delete a box by ID
router.delete('/:id', boxController.deleteBox);

router.get('/filter', boxController.filterBoxes);

module.exports = router;
