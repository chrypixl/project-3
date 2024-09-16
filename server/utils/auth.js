const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '30d';

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
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    console.log('Token received:', token);

    if (!token) {
      console.log('No token found');
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret);
      console.log('Decoded data:', data);
      req.user = data;
    } catch (err) {
      console.error('Invalid token:', err);
    }

    console.log('User from context in middleware:', req.user);
    return req;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
}
