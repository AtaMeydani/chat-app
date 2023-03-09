const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    id:ID
    firstName:String
    lastName:String
    email:String
  }


  input UserSignUpInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
  }


  input UserSignInInput{
    email:String!
    password:String!
  }


  type Token{
    token:String!
  }


  scalar Date
  

  type Message{
    id:ID!
    text:String!
    receiverId:Int!
    senderId:Int!
    createdAt:Date!
  }


  type Query {
    users: [User]
    user: User
    messagesByUser(receiverId:Int!):[Message]
  }


  type Mutation {
    signUpUser(userNew:UserSignUpInput!):User
    signInUser(userSignIn:UserSignInInput!):Token
    createMessage(receiverId:Int!, text:String):Message
  }

`;

export default typeDefs;
