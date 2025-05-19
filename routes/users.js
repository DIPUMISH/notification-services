const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/users
// @desc    Register a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    const user = new User({ name, email, phone });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).json({ error: 'User registration failed.' });
  }
});

// @route   GET /api/users
// @desc    Get all registered users (only name and ID)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'name _id');
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
