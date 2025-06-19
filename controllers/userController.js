const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  // Finding the user by their email id
  // Reason why we need something like a primary key concept even if we use noSQL DBs
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password, role });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);
    console.log("Entered password:", password);

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log("No user found for email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User found in DB:", user);
    console.log("Password in DB:", user.password);

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
// Login an existing user
/*exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};*/

// Get a user by ID (admin only)
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Update a user's role (admin only)
exports.updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const allowedRoles = ['junior-staff', 'senior-staff', 'senior-tech', 'admin'];
  const newRole = req.body.role;

  if (!allowedRoles.includes(newRole)) {
    return res.status(400).json({ message: 'Invalid role provided' });
  }

  user.role = newRole;
  await user.save();
  res.json({ message: 'User role updated', user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
};

// Delete a user (admin only)
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted successfully' });
};

// Allow get all users only for the admin role
exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};