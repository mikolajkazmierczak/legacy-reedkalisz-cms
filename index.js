import http from 'http';
import app from './server/app.js';
import db from './server/db.js';

const server = http.createServer(app);

const { PORT, MONGO_URI, DB } = process.env;
db.connect(MONGO_URI, DB);
server.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});
