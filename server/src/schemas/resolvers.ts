// Import models and utilities
import User, { IUser } from "../models/User.js";
import { IBook } from "../models/Book.js";
import { signToken, AuthenticationError } from '../services/auth.js';

// Define the Context type for the resolver's context
interface Context {
  user?: {
    _id: string;
  };
}

// Define the Auth type for authentication responses
interface Auth {
  token: string;
  user: IUser;
}

// GraphQL resolvers for Query and Mutation
const resolvers = {
  Query: {
    /**
     * Fetch all users from the database.
     */
    users: async (): Promise<IUser[] | null> => {
      return User.find({});
    },

    /**
     * Fetch a single user by ID.
     */
    singleUser: async (_parent: any, { _id }: { _id: string }): Promise<IUser | null> => {
      const params = _id ? { _id } : {};
      return User.findOne(params);
    },

    /**
     * Fetch the authenticated user's data.
     */
    me: async (_parent: any, _args: any, context: Context): Promise<IUser | null> => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
      return User.findOne({ _id: context.user._id });
    },

    /**
     * Fetch the saved books for the authenticated user.
     */
    savedBooks: async (_parent: any, _args: any, context: Context): Promise<IBook[] | null> => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
      const user = await User.findOne({ _id: context.user._id });
      return user ? user.savedBooks : null;
    },
  },

  Mutation: {
    /**
     * Create a new user and return an authentication token.
     */
    addUser: async (_parent: any, args: any): Promise<Auth> => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    /**
     * Authenticate a user with email and password, and return an authentication token.
     */
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<Auth> => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Password');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    /**
     * Save a book to the user's savedBooks array.
     */
    saveBook: async (_parent: any, { userId, input }: { userId: string; input: IBook }): Promise<IUser | null> => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      );
    },

    /**
     * Remove a book from the user's savedBooks array by book ID.
     */
    removeBook: async (_parent: any, { userId, bookId }: { userId: string; bookId: string }): Promise<IUser | null> => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

export default resolvers;
