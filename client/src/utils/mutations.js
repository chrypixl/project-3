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

export const MONEY_PLEASE = gql`
  mutation moneyPlease($tipAmount: Float) {
    moneyPlease(tipAmount: $tipAmount) {
      url
    }
  }
`;
export const UPLOAD_AVATAR = gql`
  mutation uploadAvatar($fileUrl: String!) {
   uploadAvatar(fileUrl: $fileUrl) {
    success
    message
    user {
      avatarUrl
    }
  }
  }
`;
export const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($fileName: String!) {
    updateUserAvatar(fileName: $fileName) {
      _id
      username
      avatar
    }
  }
`;
