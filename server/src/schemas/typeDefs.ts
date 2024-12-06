// Import gql for defining GraphQL type definitions
import gql from 'graphql-tag';

/**
 * GraphQL type definitions for the application.
 * These enforce the structure of data exchanged in the API.
 */
const typeDefs = gql`
    # Type definition for a User
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    # Type definition for authentication response
    type Auth {
        token: String
        user: User
    }

    # Type definition for a Book
    type Book {
        _id: ID!            # Unique identifier for the book (optional if using MongoDB auto-generated ID)
        bookId: String      # Custom identifier for the book
        title: String!      # Title of the book
        authors: [String]   # List of authors
        description: String!# Description of the book
        image: String       # Image URL of the book
        link: String        # External link to the book
    }

    # Input type for adding or updating a book
    input BookInput {
        bookId: String
        title: String!
        authors: [String]
        description: String!
        image: String
        link: String
    }

    # Queries to fetch data
    type Query {
        users: [User]                        # Fetch all users
        singleUser(_id: ID!): User           # Fetch a single user by ID
        me: User                             # Fetch the authenticated user's data
        savedBooks: User                     # Fetch saved books of the authenticated user
    }

    # Mutations to modify data
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth # Register a new user
        login(email: String!, password: String!): Auth                     # Login user and return authentication token
        saveBook(userId: ID!, input: BookInput!): User                     # Save a book to the user's savedBooks array
        removeBook(userId: ID!, bookId: String!): User                     # Remove a book from the user's savedBooks array
    }
`;

export default typeDefs;
