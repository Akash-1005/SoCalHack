// server.js
const express = require('express');
const cors = require('cors');
const { Anon } = require('@anyone-protocol/anyone-client');

const app = express();
app.use(cors());
app.use(express.json());

let anonInstance = null;

app.post('/api/authenticate', (req, res) => {
  const { username, password } = req.body;

  // Implement your authentication logic here
  // For demonstration purposes, we'll accept a specific username and password
  if (username === 'user' && password === 'pass') {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/start-anon', async (req, res) => {
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

app.post('/api/stop-anon', async (req, res) => {
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

app.listen(5000, () => {
  console.log('Backend server listening on port 5000');
});
