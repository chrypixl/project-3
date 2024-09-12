const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const recordingSchema = new Schema({
    recordingAudio: {
      type: String, //? What type should be assigned to recordingAudio? What other properties are needed?
    },
    recordingAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  });

const Recording = model('Recording', recordingSchema);

module.exports = Recording;