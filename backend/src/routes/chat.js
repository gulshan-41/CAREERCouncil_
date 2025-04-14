const express = require('express');
const router = express.Router();
const { getXaiResponse } = require('../services/xAIServices');

router.post('/chat', (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }
  getXaiResponse(query)
    .then((response) => res.json(response))
    .catch((error) => res.status(500).json({ error: 'Server error' }));
});

module.exports = router;