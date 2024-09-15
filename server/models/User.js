const { Schema } = require('mongoose');
const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose');
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
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg', 
  },
  recordings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recording',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
