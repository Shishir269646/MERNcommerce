const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// helper
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

/**
 * POST /api/auth/register
 */
const registerUser = async (req, res) => {
  const { username, email, password, isAdmin = false } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password, isAdmin });

    res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * POST /api/auth/login
 *          Anyone can log in; later you protect admin routes.
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/auth/users   (admin only)
 */
const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find({}, 'username email isAdmin');
    res.json(users);
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * DELETE /api/auth/users/:id   (admin only)
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User deleted', _id: req.params.id });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/auth/profile   (current logged‑in user)
 */

const getUserProfile = async (req, res) => {
  res.json(req.user); // protect middleware already strips password
};

module.exports = { registerUser, loginUser, getAllUsers, deleteUser, getUserProfile };
