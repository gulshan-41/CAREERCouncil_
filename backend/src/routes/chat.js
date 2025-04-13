const express = require('express');
const router = express.Router();

// POST /api/chat
router.post('/chat', (req, res) => {
  const { query } = req.body; // Get query from ArrowAI
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }
  // Mock response (no xAI key yet)
  res.json({ response: `Mock AI answer for: ${query}` });
});

module.exports = router;