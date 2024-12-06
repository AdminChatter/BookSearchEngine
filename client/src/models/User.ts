import IBook from "./Book";
export interface IAddUser {
    username?: string;
    email: string;
    password: string;
}

export interface IUser {
    userId: string;
    username: string;
    email: string;
    password: string;
    bookCount: number;
    savedBooks: IBook[];
    isCorrectPassword(password: string): Promise<boolean>;
}