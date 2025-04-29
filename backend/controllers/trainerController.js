const db = require('../db');

// Function to add a new trainer
exports.addTrainer = (req, res) => {
  const { name, email, subject_id } = req.body;

  // Insert the trainer into the trainer table
  const query = 'INSERT INTO trainer (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error adding trainer', error: err });
    } else {
      // After trainer is added, insert the trainer-subject relationship
      const trainer_id = result.insertId; // Get the ID of the inserted trainer
      const trainerSubjectQuery = 'INSERT INTO trainer_subject (trainer_id, subject_id) VALUES (?, ?)';
      db.query(trainerSubjectQuery, [trainer_id, subject_id], (err, result) => {
        if (err) {
          res.status(500).json({ message: 'Error linking trainer with subject', error: err });
        } else {
          res.status(200).json({ message: 'Trainer added and linked with subject successfully' });
        }
      });
    }
  });
};

// Function to get all trainers
exports.getAllTrainers = (req, res) => {
  const query = 'SELECT * FROM trainer';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching trainers', error: err });
    } else {
      res.status(200).json(result);
    }
  });
};

// Function to delete a trainer by ID
exports.deleteTrainer = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM trainer WHERE emp_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting trainer', error: err });
    } else {
      res.status(200).json({ message: 'Trainer deleted successfully' });
    }
  });
};

// Function to get trainer by ID
exports.getTrainerById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM trainer WHERE emp_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching trainer by ID', error: err });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Trainer not found' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Function to get trainers by subject
exports.getTrainersBySubject = (req, res) => {
  const subjectId = req.params.subject;  // Get the subject ID from URL
  const query = `
    SELECT t.emp_id, t.name, t.email 
    FROM trainer t
    JOIN trainer_subject ts ON t.emp_id = ts.trainer_id
    WHERE ts.subject_id = ?;
  `;
  db.query(query, [subjectId], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching trainers by subject', error: err });
    } else {
      console.log(result);  // Log the result here
      if (result.length === 0) {
        res.status(404).json({ message: 'No trainers found for this subject' });
      } else {
        res.status(200).json(result);  // Return the list of trainers
      }
    }
  });
};
