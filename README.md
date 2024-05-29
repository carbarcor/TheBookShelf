# TheBookShelf

A simple web application for searching for and reviewing books.

## Table of Contents
- Introduction
- Features
- Technologies Used
- Installation
- Usage
- License
  
## Introduction
TheBookShelf is a web application that allows users to search for and review books. It is built using the MERN stack (MongoDB, Express, React, Node.js).

## Features
- User authentication and authorization
- Search for books by title, author, and/or ISBN.
- View book details and reviews
- Add and manage reviews
- Responsive design

## Technologies Used
- Frontend: React, React Router
- Backend: Node.js, Express
- Database: MongoDB
- Styling: CSS
- Authentication: JWT (JSON Web Tokens)

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

Create a .env file in the server directory (backend-folder) and add the keys provided by us.

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
- Searcg Books:
Navigate to the dashboard and search for books.
- View Books:
Browse the book list and click on a book to see its details and reviews.
- Add Reviews:
Leave a review and rating for a book after viewing its details.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
