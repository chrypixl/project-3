const { Schema, model } = require('mongoose');

//* User model has already been created but the profile was built in case it is also needed. 

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