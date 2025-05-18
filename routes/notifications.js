const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const User = require('../models/User');

// POST /api/notifications
router.post('/', async (req, res) => {
  try {
    const { userId, type, content } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const notification = new Notification({ user: userId, type, content, status: 'sent' });
    await notification.save();

    // Simulate delivery (email, sms, etc.)
    console.log(`📤 [${type.toUpperCase()}] Sent to user ${user.name}: ${content}`);

    res.status(201).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
