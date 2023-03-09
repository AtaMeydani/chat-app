import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignUpUser($userNew: UserSignUpInput!) {
    signUpUser(userNew: $userNew) {
      email
      firstName
      id
      lastName
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SignInUser($userSignIn: UserSignInInput!) {
    signInUser(userSignIn: $userSignIn) {
      token
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation CreateMessage($receiverId: Int!, $text: String) {
    createMessage(receiverId: $receiverId, text: $text) {
      createdAt
      id
      receiverId
      senderId
      text
    }
  }
`;
