// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

module.exports = mongoose.model('User', userSchema);

// This code defines a Mongoose schema for a User model.
//  The schema includes three fields: name, email, and phoneNumber, all of which are of type String. 
// The model is then exported for use in other parts of the application.