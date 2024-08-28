const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/OwnerController');

// Get all owners
router.get('/', ownerController.getOwners);

// Create a new owner
router.post('/', ownerController.createOwner);

// Update an existing owner by ID
router.put('/:id', ownerController.updateOwner);

// Delete an owner by ID
router.delete('/:id', ownerController.deleteOwner);

module.exports = router;
