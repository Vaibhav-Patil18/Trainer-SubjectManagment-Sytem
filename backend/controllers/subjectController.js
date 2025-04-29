const db = require('../db');


// Add a new subject
exports.addSubject = (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO subject (name) VALUES (?)';

  db.query(query, [name], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error adding subject', error: err });
    } else {
      res.status(201).json({ message: 'Subject added successfully', subjectId: result.insertId });
    }
  });
};

// Get all subjects
exports.getAllSubjects = (req, res) => {
  const query = 'SELECT * FROM subject';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching subjects', error: err });
    } else {
      res.status(200).json(result);
    }
  });
};

// Get a subject with its trainers
exports.getSubjectWithTrainers = (req, res) => {
  const { id } = req.params;

  // First, get the subject details
  const subjectQuery = 'SELECT * FROM subject WHERE id = ?';
  
  db.query(subjectQuery, [id], (err, subjectResult) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching subject', error: err });
    }
    if (subjectResult.length === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const subject = subjectResult[0];

    // Now get the trainers associated with this subject
    const trainerQuery = `
      SELECT trainer.* FROM trainer
      JOIN trainer_subject ON trainer.emp_id = trainer_subject.trainer_id
      WHERE trainer_subject.subject_id = ?
    `;

    db.query(trainerQuery, [id], (err, trainerResult) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching trainers', error: err });
      }

      res.status(200).json({
        subject_name: subject.name,
        trainers: trainerResult
      });
    });
  });
};
