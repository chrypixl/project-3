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
    addUser(username: String!, email: String!): Auth
    login(email: String!): Auth
    addRecording(recordingAudio): Recording
    removeRecording(recordingId: ID!): Recording
  }
`;
//? What parameters does Recording require besides title, author, and createdAt? What parameter will make up the content of stored recording?
//* For now, using recordingAudio as a placeholder/possible solution
//TODO: addRecording requires content parameters. example: A mutation adding a blog post would require addPost(postText: String!).

module.exports = typeDefs;