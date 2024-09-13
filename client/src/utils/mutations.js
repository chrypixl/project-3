import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_RECORDING = gql`
  mutation addRecording($title: String!, $author: String!, $recordingAudio: String!) {
    addRecording(title: $title, author: $author, recordingAudio: $recordingAudio) {
      _id
      title
      author
      recordingAudio
      createdAt
    }
  }
`;

export const REMOVE_RECORDING = gql`
  mutation removeRecording($recordingId: ID!) {
    removeRecording(recordingId: $recordingId) {
      _id
      title
      author
      recordingAudio
      createdAt
    }
  }
`;
