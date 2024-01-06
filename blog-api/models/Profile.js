const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Please add a name.']
  },
  description: {
    type: String,
  },
  image : {
    type: String
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);