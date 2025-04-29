const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // <-- ADD THIS
const app = express();

// Middlewares
app.use(cors()); // <-- ADD THIS
app.use(bodyParser.json());

// Routes
const trainerRoutes = require('./routes/trainerRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

// Use the routes
app.use('/trainer', trainerRoutes);
app.use('/subject', subjectRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
