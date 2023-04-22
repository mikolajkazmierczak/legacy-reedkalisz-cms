import http from 'http';
import app from './server/app.js';
import db from './server/db.js';

const server = http.createServer(app);

const { PORT, MONGO_URI, DB_TEST } = process.env;
db.connect(MONGO_URI, DB_TEST, db.drop);
server.listen(PORT, () => {
  console.log('\x1b[47m\x1b[31mWARNING\x1b[0m TESTING SERVER');
  console.log(`Port: ${PORT}`);
});
