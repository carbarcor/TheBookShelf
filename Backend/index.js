const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes'); 

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // This is necessary for sending cookies or headers
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('DB not connected', err));

app.use('/', authRoutes);

const port = 8000;
app.listen(port, async () => {
  console.log(`Server on ${port}`);
});
