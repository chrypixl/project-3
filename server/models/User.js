const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      //*Consider adding properties to verify the password is strong
    },
    recordings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recording',
      },
    ],
});

//TODO: Hash password using bcrypt

//TODO: Validate password



const User = model('User', userSchema);

module.exports = User;