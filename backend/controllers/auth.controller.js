const User = require('../models/user.model');
const jwt = require('jsonwebtoken');



// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};



// create new user
const registerUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  // Basic validation
  if (!username || !email || !password || !isAdmin) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password, isAdmin });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });

  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }

};


//Login user

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

    // Only allow admin login here
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};




// Get logged-in user's profile
const getAllUsers = async (req, res) => {
  try {
    // Only return name and email of all users
    const users = await User.find({}, 'name email'); // same as .select('name email')

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { registerUser, loginUser, getAllUsers };
