const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.post('/send', async (req, res) => {
  const senderId = req.session.user_id;
  if (!senderId) return res.status(401).json({ error: 'Not logged in' });

  const { recipient, subject, body } = req.body;

  if (!recipient || !subject || !body) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Get recipient ID
    const [users] = await db.query('SELECT user_id FROM user_info WHERE email = ?', [recipient]);
    if (users.length === 0) return res.status(404).json({ error: 'Recipient not found' });

    const recipientId = users[0].user_id;

    // Insert email
    await db.query(`
      INSERT INTO emails (sender_id, recipient_id, subject, body)
      VALUES (?, ?, ?, ?)
    `, [senderId, recipientId, subject, body]);

    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
