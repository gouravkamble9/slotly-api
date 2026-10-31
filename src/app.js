import express from 'express';

import servicesRouter from './routes/services.routes.js';

const app = express();

// First middleware! express.json() runs on EVERY request
// and if the request has a JSON body, it parses it and fills req.body.
// Without this line, req.body would be undefined in POST/PATCH handlers.
app.use(express.json());

// Mounts the services router. All paths inside that router
// are prefixed with /api/services automatically
app.use('/api/services', servicesRouter);

// Health check - a tiny route that tells "the server is alive".
// Useful later for deployment monitoring.
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy' });
});

export default app;