require('dotenv').config();
require('./db').connect();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const { CLIENT_ORIGIN } = process.env;

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ message: '/' });
});

app.use('/auth', require('./routes/auth'));

module.exports = app;
