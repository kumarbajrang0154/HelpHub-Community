const User = require('../models/User');

const createUser = async ({ name, email, password, role = 'user' }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error('User with this email already exists');
    error.status = 409;
    throw error;
  }

  const user = new User({ name, email, password, role });
  await user.save();
  return user;
};

const findUserByEmail = (email) => User.findOne({ email });
const findUserById = (id) => User.findById(id);

module.exports = { createUser, findUserByEmail, findUserById };
