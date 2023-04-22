import crud from '#services/crud';
import auth from '#services/auth';
import User from '#models/User';

export default _ => ({
  register: async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const user = await crud.read(User, { email });
      if (user)
        return res.status(409).json({ message: 'User already exists!' });
      const salt = await auth.encryptPassword(password);
      const newUserData = { email, password: salt, firstName, lastName };
      await crud.create(req, User, newUserData);
      const newUser = await crud.read(User, { email });
      auth.startSession(req, newUser);
      res.status(201).json({ message: 'Registered! Authenticated.' });
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await crud.read(User, { email }, { limit: 1 });
      if (!user) return res.status(404).json({ error: 'User not found.' });
      const isValid = await auth.comparePasswords(password, user);
      if (!isValid)
        return res.status(401).json({ error: 'Password is invalid.' });
      auth.startSession(req, user);
      res.status(200).json({ message: 'Logged in! Authenticated.' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.toString() });
    }
  },

  logout: (req, res) => {
    auth.endSession(req);
    res.json({ message: 'Logged out.' });
  },

  me: async (req, res) => {
    try {
      const user = auth.getSession(req);
      if (!user._id) return res.status(404).json({ error: 'User not found.' });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
});
