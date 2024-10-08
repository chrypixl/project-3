const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String
    avatar: String
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

  type Tipjar {
    url: String
  }

  scalar Upload  

  type File {
    url: String
    success: Boolean
    message: String
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
    updateUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): Auth
    uploadAvatar(file: Upload!): File
    updateUserAvatar(fileName: String!): User
    addRecording(title: String!, author: String!, recordingAudio: String!): Recording
    removeRecording(recordingId: ID!): Recording
    moneyPlease(tipAmount: Float): Tipjar
  }
`;

module.exports = typeDefs;
