const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET /api/users/:id/notifications
router.get('/:id/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.id });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

module.exports = router;
