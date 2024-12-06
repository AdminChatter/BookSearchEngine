# Book Search Engine

## Description
The Book Search Engine is a web application that allows avid readers to search for books, save their favorites, and manage their reading list. This project leverages modern technologies such as the MERN stack (MongoDB, Express.js, React, and Node.js) and Apollo Server for GraphQL API integration. The goal of this project was to transition from a RESTful API architecture to GraphQL to enhance performance and scalability, making it a valuable learning experience in modern web development practices.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)

## Installation

Follow these steps to set up the Kanban Board locally:

1. Clone the repository:
```bash
git clone git@github.com:AdminChatter/BookSearchEngine.git
```

2. Navigate to the project directory:
```bash
cd book-search-engine
npm install
```

3. Set up the environment variables:
    Create a .env file in the root directory.
    Add the following variables:
    env
    Copy code
    MONGODB_URI=<your-mongodb-connection-string>
    SECRET=<your-secret-key>

4. Run the application:
```bash
npm run develop
```

## Usage
Steps to Use:
    Open the application in your browser (default: http://localhost:3000).
    Use the search bar to find books by title, author, or keywords.
    Log in or sign up to save your favorite books.
    Manage your saved books list, including viewing or removing saved books.

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.<BR>
Click the license above to learn more about this license.

## Badges

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg)
![Javascript](https://img.shields.io/badge/Javascript-blue.svg)

## Features
- GraphQL API: Enhanced data querying and mutation capabilities.
- User Authentication: Signup and login features with secure token-based authentication.
- Search and Save: Connects to the Google Books API to fetch and store book information.
- Responsive Interface: Built with React to ensure an intuitive user experience.

## How to Contribute
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -m 'Add feature').
4. Push to the branch (git push origin feature-name).
5. Open a Pull Request.