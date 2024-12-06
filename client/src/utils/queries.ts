import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query GetUsers {
    users {
        userId
        username
        email
        bookCount
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}`;

export const QUERY_SINGLE_USER = gql`
query GetSingleUser($id: ID) {
    singleUser(_id: $id) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}`;

export const QUERY_ME = gql`
query GetMe {
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}`;

export const GOOGLE_BOOKS_QUERY = gql`
query GoogleBooks($query: String!) {
    googleBooks(query: $query) {
        title
        authors
        description
        imageLinks {
            smallThumbnail
            thumbnail
        }
    }
}`;

export const GET_SAVED_BOOKS = gql`
query getSavedBooks {
    savedBooks {
        _id
        bookId
        title
        authors
        description
        image
        link
    }
}`;
