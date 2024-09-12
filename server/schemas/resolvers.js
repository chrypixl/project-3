const {User, Recording, Profile} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('recordings');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('recordings');
        },
        recordings: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Recording.find(params).sort({ createdAt: -1 });
        },
        recording: async (parent, { recordingId }) => {
            return Recording.findOne({ _id: recordingId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('recordings');
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        addRecording: async (parent, { recordingAudio }, context) => {
            if (context.user) {
              const recording = await Recording.create({
                recordingAudio,
                recordingAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { recordings: recording._id } }
              );
      
              return recording;
            }
            throw AuthenticationError;
        },
        removeRecording: async (parent, { recordingId }, context) => {
            if (context.user) {
              const recording = await Recording.findOneAndDelete({
                _id: recordingId,
                recordingAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { recordings: recording._id } }
              );
      
              return recording;
            }
            throw AuthenticationError;
        },
    },
}

module.exports = resolvers;