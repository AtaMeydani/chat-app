import bcrypt from "bcryptjs";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import {PubSub} from 'graphql-subscriptions'

const pubsub = new PubSub()
const prisma = new PrismaClient();

const MESSAGE_ADDED = 'MESSAGE_ADDED'
const resolvers = {
  Query: {
    users: async (_, args, { userID }) => {
      if (!userID) throw new ForbiddenError("You must be logged in");
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: { id: { not: userID } },
      });
      return users;
    },

    user: async (_, args, { userID }) => {
      if (!userID) throw new ForbiddenError("You must be logged in");
      const user = await prisma.user.findUnique({
        where: { id: userID },
      });
      return user;
    },

    messagesByUser: async (_, { receiverId }, { userID }) => {
      if (!userID) throw new ForbiddenError("You must be logged in");
      
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userID, receiverId: receiverId }, // sended messages
            { senderId: receiverId, receiverId: userID }, // recieved messages
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return messages;
    },
  },

  Mutation: {
    signUpUser: async (_, { userNew }) => {
      const user = await prisma.user.findUnique({
        where: { email: userNew.email },
      });
      if (user) throw new AuthenticationError("User already exists with that email");
      const hashedPassword = await bcrypt.hash(userNew.password, 10);
      const newUser = await prisma.user.create({
        data: {
          ...userNew,
          password: hashedPassword,
        },
      });
      return newUser;
    },

    signInUser: async (_, { userSignIn }) => {
      const user = await prisma.user.findUnique({
        where: { email: userSignIn.email },
      });
      if (!user) throw new AuthenticationError("User doesn't exist with that email");
      const doMath = await bcrypt.compare(userSignIn.password, user.password);
      if (!doMath) throw new AuthenticationError("email or password is invalid");
      const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET);
      return { token };
    },

    createMessage: async (_, { receiverId, text }, { userID }) => {
      if (!userID) throw new ForbiddenError("You must be logged in");
      const message = await prisma.message.create({
        data: {
          text,
          receiverId,
          senderId: userID,
        },
      });

      pubsub.publish(MESSAGE_ADDED, {messageAdded: message})
      return message;
    },
  },

  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_ADDED)
    }
  }
};

export default resolvers;
