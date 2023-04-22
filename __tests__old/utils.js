import mongoose from 'mongoose';
import db from '../server/db.js';

export const getAuthCookie = res => {
  const cookies = res.headers['set-cookie'];
  for (let cookie of cookies) {
    const authCookiePattern = /connect\.sid=(.*?)(?=;)/;
    authCookie = cookie.match(authCookiePattern)[0];
    if (authCookie) return authCookie;
  }
};

export const dbConnect = async () => {
  const { MONGO_URI, DB_TEST } = process.env;
  db.connect(MONGO_URI, DB_TEST);
};

export const dbDrop = async () => {
  const conn = mongoose.connection;
  await conn.dropDatabase();
  await conn.close();
};
