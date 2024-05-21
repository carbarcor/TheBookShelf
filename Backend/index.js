const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Assicurati che il percorso sia corretto

const app = express();

// Middleware
app.use(express.json());

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
