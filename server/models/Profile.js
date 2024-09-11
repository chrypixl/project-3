const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  recordings: [

  ],
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;