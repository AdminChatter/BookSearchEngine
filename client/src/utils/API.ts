import type { IUser, IAddUser } from '../models/User.js';
import type { GoogleAPIBook } from '../models/GoogleAPIBook.js';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_SINGLE_USER, QUERY_ME, GOOGLE_BOOKS_QUERY, GET_SAVED_BOOKS } from './queries.js';
import { CREATE_USER, LOGIN } from './mutations.js';
import Auth from './auth.js';

// Fetch all users
export const getAllUsers = () => {
    const { loading, error, data } = useQuery(QUERY_USERS);

    if (loading) return { loading, error: null, data: null };
    if (error) return { loading: false, error, data: null };
    return { loading: false, error: null, data: data.users };
};

// Fetch a single user by their ID
interface UserByIDResult {
    loading: boolean;
    error: Error | null;
    data: IUser | null;
}

export const UserByID = (_id: string): UserByIDResult => {
    const { loading, error, data } = useQuery<{ user: IUser }>(QUERY_SINGLE_USER, {
        variables: { id: _id },
    });

    if (loading) return { loading, error: null, data: null };
    if (error) return { loading: false, error, data: null };
    return { loading: false, error: null, data: data?.user || null };
};

// Fetch the logged-in user's data
interface GetMeResult {
    loading: boolean;
    error: Error | null;
    data: IUser | null;
}

export const GetMe = (): GetMeResult => {
    const { loading, error, data } = useQuery<{ me: IUser }>(QUERY_ME, {
        skip: !Auth.loggedIn(), // Skip if the user is not logged in
    });

    if (loading) return { loading, error: null, data: null };
    if (error) return { loading: false, error, data: null };
    return { loading: false, error: null, data: data?.me || null };
};

// Create a new user account
interface CreateUserResult {
    error: Error | null;
    data: IAddUser | null;
}

export const CreateUser = (username: string, email: string, password: string): CreateUserResult => {
    const [createUser, { error, data }] = useMutation<{ addUser: IAddUser }>(CREATE_USER);

    const handleCreateUser = async () => {
        try {
            await createUser({ variables: { username, email, password } });
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    handleCreateUser();

    if (error) return { error, data: null };
    return { error: null, data: data?.addUser ?? null };
};

// User login
interface LoginResult {
    error: Error | null | undefined;
    data: { token: string } | null;
}

export const Login = (): [(email: string, password: string) => Promise<void>, LoginResult] => {
    const [login, { error, data }] = useMutation<{ auth: { token: string } }>(LOGIN);

    const handleLogin = async (email: string, password: string) => {
        try {
            const results = await login({ variables: { email, password } });
            if (results.data?.auth.token) {
                Auth.login(results.data.auth.token);
            }
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    return [handleLogin, { error, data: data?.auth ?? null }];
};

// Query Google Books API to search for books
interface GoogleBooksResult {
    loading: boolean;
    error: Error | null;
    data: GoogleAPIBook[] | null;
}

export const useGoogleBooks = (query: string): GoogleBooksResult => {
    const { loading, error, data } = useQuery<{ googleBooks: GoogleAPIBook[] }>(GOOGLE_BOOKS_QUERY, {
        variables: { query },
        skip: !query, // Skip if the query string is empty
    });

    if (loading) return { loading, error: null, data: null };
    if (error) return { loading: false, error, data: null };
    return { loading: false, error: null, data: data?.googleBooks || null };
};

// Fetch all saved books for the logged-in user
export const useSavedBooks = () => {
    const { loading, error, data } = useQuery(GET_SAVED_BOOKS);

    if (loading) return { loading, error: null, data: null };
    if (error) return { loading: false, error, data: null };
    return { loading: false, error: null, data: data.savedBooks };
};
