import {gql} from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recordings {
        _id
        recordingAudio
        createdAt
      }
    }
  }
`;

export const QUERY_RECORDINGS = gql`
  query getRecordings {
    recordings {
      _id
      recordingAudio
      recordingAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_RECORDING = gql`
  query getSingleRecording($recordingId: ID!) {
    recording(recordingId: $recordingId) {
      _id
      recordingAudio
      recordingAuthor
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      recordings {
        _id
        recordingAudio
        recordingAuthor
        createdAt
      }
    }
  }
`;