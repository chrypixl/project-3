const {User, Recording} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const { createWriteStream, unlink } = require('fs');
const path = require('path');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('recordings');
    },
    user: async (parent, {username}) => {
      return User.findOne({username}).populate('recordings');
    },
    recordings: async (parent, {username}) => {
      const params = username ? {username} : {};
      return Recording.find(params).sort({createdAt: -1});
    },
    recording: async (parent, {recordingId}) => {
      return Recording.findOne({_id: recordingId});
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id)
          .select('-__v -password')
          .populate('recordings');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return {token, user};
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    login: async (parent, {username, password}) => {
      const user = await User.findOne({username});
      if (!user) {
        throw new AuthenticationError('No user found with this username');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }
      const token = signToken(user);
      return {token, user};
    },
    addRecording: async (parent, {title, author, recordingAudio}, context) => {
      if (context.user) {
        const recording = await Recording.create({
          title,
          author,
          recordingAudio
        });
        await User.findOneAndUpdate(
          {_id: context.user._id},
          {$addToSet: {recordings: recording._id}}
        );
        return recording;
      }
      throw new AuthenticationError('Not authenticated');
    },
    removeRecording: async (parent, {recordingId}, context) => {
      if (context.user) {
        const recording = await Recording.findOneAndDelete({
          _id: recordingId,
          author: context.user.username,
        });
        await User.findOneAndUpdate(
          {_id: context.user._id},
          {$pull: {recordings: recording._id}}
        );
        return recording;
      }
      throw new AuthenticationError('Not authenticated');
    },
    uploadAvatar: async (parent, { fileUrl }, context) => {
      const userId = context.user.id;
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      user.avatarUrl = fileUrl;
      await user.save();

      return {
        success: true,
        message: 'Avatar updated successfully',
        user,
      };
    },
    updateUserAvatar: async (parent, { fileName }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update the avatar.');
      }
    
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { avatar: fileName },
        { new: true }
      );
    
      return updatedUser;
    },
    
  
    moneyPlease: async (parent, {tipAmount}, context) => {
      const url = new URL(context.headers.referer).origin;
      console.log(tipAmount);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:[{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Your tip amount',
            },
            unit_amount: tipAmount * 100,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${url}/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      return {url: session.url};
    }
  },
};

module.exports = resolvers;
