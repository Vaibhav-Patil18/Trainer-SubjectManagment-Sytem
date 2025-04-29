const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// POST - Add a new subject
router.post('/', subjectController.addSubject);

// GET - Get all subjects
router.get('/', subjectController.getAllSubjects);

// GET - Get a subject with its trainers
router.get('/:id', subjectController.getSubjectWithTrainers);

module.exports = router;
