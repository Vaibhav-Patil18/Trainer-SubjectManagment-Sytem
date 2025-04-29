const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

// Add a new trainer
router.post('/', trainerController.addTrainer);

// Get all trainers
router.get('/', trainerController.getAllTrainers);

// Delete a trainer by ID
router.delete('/:id', trainerController.deleteTrainer);

// Get a trainer by ID
router.get('/:id', trainerController.getTrainerById);


// Get trainers by subject
router.get('/:subject/topic', trainerController.getTrainersBySubject);

module.exports = router;
