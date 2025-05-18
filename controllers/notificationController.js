const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const { sendSMS } = require('../services/smsService');
const { sendInAppNotification } = require('../services/inAppService');

exports.sendNotification = async (req, res) => {
  try {
    const { userId, type, content } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const notification = new Notification({ userId, type, content });
    await notification.save();

    // Trigger appropriate channel
    switch (type) {
      case 'email':
        sendEmail(user.email, content);
        break;
      case 'sms':
        sendSMS(user.phoneNumber, content);
        break;
      case 'in_app':
        sendInAppNotification(userId, content);
        break;
      default:
        return res.status(400).json({ error: 'Invalid notification type' });
    }

    notification.status = 'sent';
    await notification.save();

    res.status(200).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const { id } = req.params;
    const notifications = await Notification.find({ userId: id });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
