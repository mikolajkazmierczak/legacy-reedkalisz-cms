import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './router.js';
import { DateTime } from 'luxon';

const app = express();

// load environment variables
dotenv.config();

// setup cors and cookies
const { CLIENT_ORIGIN } = process.env;
console.log(`Accepted origin: ${CLIENT_ORIGIN}`);
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded());
app.use(cookieParser());

// Use the session middleware
const { SESSION_SECRET_KEY } = process.env;
const COOKIE_AGE_MS = 15 * 60 * 1000;
app.use(
  session({
    secret: SESSION_SECRET_KEY,
    cookie: { maxAge: COOKIE_AGE_MS },
    resave: false, // dependent on the database
    saveUninitialized: true,
  })
);

app.use('/img', express.static('static'));

routes(app);

console.log(DateTime.now().toISO());

export default app;
