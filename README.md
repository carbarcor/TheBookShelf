# TheBookShelf

A simple web application for searching for and reviewing books.

## Table of Contents
- Introduction
- Features
- Installation
- Usage
- Technologies Used
- Motivation for using React
- License
  
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

## Motivation for using React
We chose to use React to develop our web application because it offers a good balance between simplicity, flexibility, and performance. For us, it was important to choose a technology that was both easy for us to learn and powerful enough to handle what we wanted to build. React's use of JSX makes the code intuitive and easy to understand, which meant that we could quickly get started with development. In comparison, Angular is harder to learn as a beginner and with its inclusion of TypeScript, we felt it would be too complex for our needs as a small beginner team working on a small scale web application.

React's large and active community is also a significant factor. In comparison to Vue, also a framework that is considered easy to learn as a beginner, the Vue community is not as big or developed. The extensive documentation, tutorials, and available third-party components made us choose React in favour of Vue, as we wanted to build a full stack JavaScript application. The available tutorials and community support around MERN in comparison to MEVN was simply larger, which was an important part of our decision.

The flexibility of React, as a library rather than a complete framework, gave us the freedom to choose tools for routing and state management ourselves, something that we perceived Angular and Vue did not offer to the same extent. We also appreciated React's modular architecture, which makes it easy to isolate and manage components, facilitating scalability.

Performance in React was another crucial factor for us. By using a Virtual DOM, React optimizes updates to the user interface, giving us faster renderings. This was particularly important for us because our service required dynamic and updated interfaces.

In summary, React provided us with the simplicity, flexibility, performance, and support we felt we needed to develop our web application. Therefore, React felt like the best choice compared to Vue and Angular.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
