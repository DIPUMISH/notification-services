const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const newUser = new User({
  name: 'Dipanshu Mishra',
  email: '22053947@kiit.ac.in',
  phoneNumber: '+919026871966',
});

newUser.save()
  .then(user => {
    console.log('User created:', user);
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
