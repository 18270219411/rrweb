const mongoose = require('mongoose');
const db = require('./index');

const EventSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: [true, 'user id cannot be empty.'],
    trim: true,
    default: 0,
  },
  name: {
    type: String,
    required: [true, 'name cannot be empty.'],
    trim: true,
    default: 'record',
  },
  path: {
    type: String,
    required: [true, 'path cannot be empty.'],
    trim: true,
    default: '',
  },
  fileName: {
    type: String,
    required: [true, 'file name cannot be empty.'],
    trim: true,
    default: '',
  },
  status: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const EventModel = db.model('events', EventSchema);

module.exports = EventModel;