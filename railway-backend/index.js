const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pathRoutes = require('./routes/path.js');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/get-path', pathRoutes);

// Default route for base URL
app.get('/', (req, res) => {
  res.send('Welcome to the Railway Optimization System Backend');
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
