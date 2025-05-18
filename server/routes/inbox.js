const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/inbox', async (req, res) => {
  const userId = req.session.user_id;
  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  try {
    const [emails] = await db.query(`
      SELECT e.subject, e.body, e.timestamp, u.full_name AS sender_name
      FROM emails e
      JOIN user_info u ON e.sender_id = u.user_id
      WHERE e.recipient_id = ?
      ORDER BY e.timestamp DESC
    `, [userId]);

    res.json({ emails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
