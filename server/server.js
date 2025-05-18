const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));


app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/inbox'));
app.use('/api', require('./routes/send'));
app.use('/api', require('./routes/sent'));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
