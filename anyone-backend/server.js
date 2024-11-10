// server.js
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { Anon } = require('@anyone-protocol/anyone-client');
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();
app.use(cors());
app.use(express.json());

let anonInstance = null;

// Auth0 middleware to protect routes
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

// Authentication route (replace custom logic with Auth0)
app.post('/api/authenticate', checkJwt, (req, res) => {
  res.json({ success: true, message: 'Authenticated successfully with Auth0' });
});

// Start Anon client (protected by Auth0)
app.post('/api/start-anon', checkJwt, async (req, res) => {
  try {
    if (!anonInstance) {
      anonInstance = new Anon();
      await anonInstance.start();

      // Wait for the client to establish a circuit
      await new Promise((resolve) => setTimeout(resolve, 15000));

      res.json({ success: true, message: 'Anon client started.' });
    } else {
      res.json({ success: true, message: 'Anon client is already running.' });
    }
  } catch (error) {
    console.error('Error starting Anon client:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stop Anon client (protected by Auth0)
app.post('/api/stop-anon', checkJwt, async (req, res) => {
  try {
    if (anonInstance) {
      await anonInstance.stop();
      anonInstance = null;
      res.json({ success: true, message: 'Anon client stopped.' });
    } else {
      res.json({ success: false, message: 'Anon client is not running.' });
    }
  } catch (error) {
    console.error('Error stopping Anon client:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5432, () => {
  console.log('Backend server listening on port 5432');
});
