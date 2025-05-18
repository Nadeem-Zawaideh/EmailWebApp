const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/db');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Get user info
    const [users] = await db.query('SELECT * FROM user_info WHERE email = ?', [email]);
    if (users.length === 0) return res.status(401).json({ error: 'Invalid email' });

    const user = users[0];
    
    // Get password hash
    const [logins] = await db.query('SELECT password_hash FROM login WHERE user_id = ?', [user.user_id]);
    if (logins.length === 0) return res.status(401).json({ error: 'Invalid login' });

    const isMatch = await bcrypt.compare(password, logins[0].password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

    // Set session and cookie
    req.session.user_id = user.user_id;
    const lastLogin = new Date().toLocaleString();
    res.cookie('lastLogin', lastLogin, { maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: 'Login successful', user: { name: user.full_name, id: user.user_id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
