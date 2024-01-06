const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please add tag name.']
  },
  url: {
    type: String,
    unique: true,
    required: [true, 'Please add tag url.']
  }
});

module.exports = mongoose.model('Tag', TagSchema);