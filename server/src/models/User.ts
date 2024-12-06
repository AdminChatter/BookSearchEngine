import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import bookSchema, { IBook } from './Book';

// Interface for User, extending Mongoose Document
export interface IUser extends Document {
    userId: string; // Unique user ID
    username: string; // Username for the user
    email: string; // Email address of the user
    password: string; // User's hashed password
    bookCount: number; // Virtual field for the count of saved books
    savedBooks: IBook[]; // Array of saved books adhering to the bookSchema
    isCorrectPassword(password: string): Promise<boolean>; // Method to validate user password
}

// Define the User schema
const userSchema = new Schema<IUser>(
    {
        userId: {
            type: String,
            required: true,
            unique: true, // Ensures each user has a unique ID
        },
        username: {
            type: String,
            required: true,
            unique: true, // Ensures username is unique
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures email is unique
            match: [/.+@.+\..+/, 'Must use a valid email address'], // Validates email format
        },
        password: {
            type: String,
            required: true, // Password is mandatory
        },
        savedBooks: {
            type: [bookSchema], // Array of books following the bookSchema
            default: [], // Default to an empty array
        },
    },
    {
        toJSON: {
            virtuals: true, // Include virtual fields when converting to JSON
        },
    }
);

// Middleware to hash user password before saving
userSchema.pre<IUser>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Method to validate password during login
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Virtual field to compute the count of saved books
userSchema.virtual('bookCount').get(function () {
    return this.savedBooks.length;
});

// Create and export the User model
const User = model<IUser>('User', userSchema);

export default User;
