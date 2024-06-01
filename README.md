# TheBookShelf

A simple web application for searching for and reviewing books.

## Table of Contents
- Introduction
- Features
- Installation
- Usage
- License
- Technologies Used
  
## Introduction
TheBookShelf is a web application that allows users to search for and review books. It is built using the MERN stack (MongoDB, Express, React, Node.js).

## Features
- User authentication and authorization
- Search for books by title, author, and/or ISBN
- View book details and reviews
- Add and manage reviews
- Responsive design


## Installation
### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB

### Setup
1. Clone the repository:

```bash
git clone https://github.com/carbarcor/thebookshelf.git
cd thebookshelf
```

2. Install dependencies for both client and server:

Install server dependencies
```bash
cd backend
npm install
```

Install client dependencies
```bash
cd frontend
npm install
```

3. Set up environment variables:

Create a .env file in the server directory (backend-folder) and add the keys provided by us, according to:
```bash
MONGO_URL =
JWT_SECRET =
```

4. Run the application:

Start the server
```bash
cd backend
npm start
```

Start the client
```bash
cd frontend
npm run dev
```

The application should now be running at http://localhost:5173.

## Usage
- Register/Login:
Create an account or log in if you already have one.
- Search Books:
Navigate to the dashboard and search for books.
- View Books:
Browse the book list and click on a book to see its details and reviews.
- Add Reviews:
Leave a review and rating for a book after viewing its details.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Technologies Used

### Frontend:
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces. Created by Facebook.
- **[React Router](https://reactrouter.com/)**: A standard library for routing in React. Created by the React Training team.

### Backend:
- **[Node.js](https://nodejs.org/)**: A JavaScript runtime built on Chrome's V8 JavaScript engine. Originally created by Ryan Dahl.
- **[Express](https://expressjs.com/)**: A minimal and flexible Node.js web application framework. Created by TJ Holowaychuk.

### Database:
- **[MongoDB](https://www.mongodb.com/)**: A NoSQL database program. Developed by MongoDB Inc.

### Styling:
- **CSS**: Used for styling the web application.

### Authentication:
- **[JWT (JSON Web Tokens)](https://jwt.io/)**: A compact, URL-safe means of representing claims to be transferred between two parties. Created by Auth0.

### Other Libraries:
- **[Axios](https://axios-http.com/)**: A promise-based HTTP client for the browser and Node.js. Created by Matt Zabriskie.
- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: A library to help hash passwords. Created by Niels Provos and David Mazieres.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: Middleware to parse cookies. Created by TJ Holowaychuk.
- **[cors](https://www.npmjs.com/package/cors)**: Middleware for enabling Cross-Origin Resource Sharing. Created by TJ Holowaychuk.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: A zero-dependency module that loads environment variables from a .env file. Created by Motdotla.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: A library to work with JSON Web Tokens. Created by Auth0.
- **[mongoose](https://mongoosejs.com/)**: A MongoDB object modeling tool. Created by LearnBoost.
