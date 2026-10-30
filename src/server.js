// Loads variables from the .env file into process.env
// node exposes process.env as a global object of key-values from the OS/environment
import 'dotenv/config';

import express from 'express';

const app = express();

// Routes so far: this app has handler functions (called route handlers)
// Each handler receives: req (what the client sent) and res (what we can send back)
app.get('/', (req, res) => {
  // .json() sends a JSON response with status 200
  res.json({
    success: true,
    message: 'Welcome to Slotly API',
  });
});

const PORT = process.env.PORT || 3000;

// Start the server. Until now nothing was listening - this opens the door on a port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});