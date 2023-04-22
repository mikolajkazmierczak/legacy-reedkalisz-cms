import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '#models/User';

async function createUser() {
  const admin = {
    email: 'admin',
    password: bcrypt.hashSync('admin', 10),
    firstName: 'admin',
    lastName: 'admin',
  };
  await User.create(admin);
  console.log(`Created an admin user (${admin.email}).`);
}

const drop = async () => {
  const conn = mongoose.connection;
  await conn.dropDatabase();
  console.log(`Dropped the database!`);
};

const connect = async (uri, db, after) => {
  const URI = uri + db;
  try {
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected to the database: ${URI}`);
    if (after) await after();
    // create a user if none exist
    const count = await User.estimatedDocumentCount();
    if (count == 0) createUser();
  } catch (err) {
    console.log('Failed connecting to the database. Exiting now...');
    console.error(err);
    process.exit(1);
  }
};

export default {
  connect,
  drop,
};
