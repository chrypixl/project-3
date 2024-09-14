const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: class AuthenticationError extends GraphQLError {
    constructor(message) {
      super(message, {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
  },

  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || req.body.token || req.query.token;

    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim(); // Remove "Bearer " from token
    }

    if (!token) {
      return { user: null };
    }

    try {
      const decoded = jwt.verify(token, secret);
      return { user: decoded.authenticatedPerson };
    } catch (err) {
      console.log('Invalid token', err);
      return { user: null };
    }
  },

  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: expiration });
  },
};
