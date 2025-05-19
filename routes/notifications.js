// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Twilio setup
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Email sending function
const sendEmail = async (to, content) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Notification',
    text: content
  });
};

// SMS sending function
const sendSMS = async (to, content) => {
  return twilioClient.messages.create({
    body: content,
    from: process.env.TWILIO_PHONE,
    to
  });
};

// POST /api/notifications
router.post('/', async (req, res) => {
  const { userId, type, content } = req.body;

  if (!userId || !type || !content) {
    return res.status(400).json({ error: 'userId, type, and content are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const notification = new Notification({ userId, type, content });
    await notification.save();

    if (type === 'email' && user.email) {
      await sendEmail(user.email, content);
    } else if (type === 'sms' && user.phone) {
      await sendSMS(user.phone, content);
    } else if (type === 'in-app') {
      // in-app: just saved in DB, nothing to send externally
    } else {
      return res.status(400).json({ error: 'Invalid type or missing contact info' });
    }

    res.status(201).json({ message: 'Notification sent', notification });

  } catch (err) {
    console.error('Notification error:', err);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// GET /api/users/:id/notifications
router.get('/users/:id/notifications', async (req, res) => {
  const { id } = req.params;

  try {
    const notifications = await Notification.find({ userId: id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

module.exports = router;
