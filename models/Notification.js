const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['email', 'sms', 'in_app'] },
  content: String,
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
// This code defines a Mongoose schema for a Notification model.