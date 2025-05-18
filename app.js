const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express(); // ✅ Define this BEFORE using app.*

app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Import routes
const notificationRoutes = require('./routes/notifications');
const userRoutes = require('./routes/users');

app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
