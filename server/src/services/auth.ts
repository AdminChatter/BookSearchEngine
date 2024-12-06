import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Middleware to authenticate the token from the request.
 * @param {Object} req - The request object.
 * @returns {Object} - The modified request object with user data if the token is valid.
 */
export const authenticateToken = ({ req }: any) => {
    // Retrieve token from request body, query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Extract token from the authorization header if present
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    // If no token is provided, return the request object as-is
    if (!token) {
        return req;
    }

    try {
        // Verify the token using the secret key and a maximum age of 2 hours
        const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2h' });
        // Attach user data to the request object
        req.user = data;
    } catch (err) {
        // Log an error message if token verification fails
        console.error('Invalid token');
    }

    // Return the request object
    return req;
};

/**
 * Generates a signed JWT token for a user.
 * @param {string} username - The username of the user.
 * @param {string} email - The email address of the user.
 * @param {unknown} _id - The unique ID of the user.
 * @returns {string} - A signed JWT token.
 */
export const signToken = (username: string, email: string, _id: unknown) => {
    // Payload containing user information
    const payload = { username, email, _id };

    // Secret key from environment variables
    const secretKey: string = process.env.JWT_SECRET_KEY || '';

    // Sign the token with the payload, secret key, and expiration time
    return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

/**
 * Custom Authentication Error class extending GraphQLError.
 * Represents an authentication error with a specific error code.
 */
export class AuthenticationError extends GraphQLError {
    constructor(message: string) {
        super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
        // Set the name property of the error
        Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
    }
}
