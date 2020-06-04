const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  bird: {
    type: String,
    required: true
  },
  season: {
    type: String,
    required: true
  },
  spotted: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

module.exports = mongoose.model('Shareables', schema);
