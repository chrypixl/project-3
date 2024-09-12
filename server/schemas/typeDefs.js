const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String
    recordings: [Recording]
  }

  type Recording { 
    _id: ID
    title: String
    author: String
    createdAt: String
    recordingAudio: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    recordings(username: String): [Recording]
    recording(recordingId: ID!): Recording
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addRecording(title: String!, author: String!, recordingAudio: String!): Recording
    removeRecording(recordingId: ID!): Recording
  }
`;

module.exports = typeDefs;
