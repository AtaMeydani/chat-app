import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query Users {
    users {
      email
      firstName
      id
      lastName
    }
  }
`;

export const GET_MESSAGES = gql`
  query MessagesByUser($receiverId: Int!) {
    messagesByUser(receiverId: $receiverId) {
      createdAt
      id
      receiverId
      senderId
      text
    }
  }
`;
