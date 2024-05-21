const express = require('express');// Importerar Express för att skapa en server
const dotenv = require('dotenv').config(); // Importerar dotenv för att hantera miljövariabler
const cors = require('cors'); // Importerar CORS för att hantera Cross-Origin Resource Sharing
const mongoose = require('mongoose'); // Importerar Mongoose för att ansluta till MongoDB
const cookieParser = require('cookie-parser'); // Importerar cookie-parser för att hantera cookies
const authRoutes = require('./routes/authRoutes'); // Importerar autentiseringsrutter
const bookRoutes = require('./routes/bookRoutes'); // Importerar bokrutter
const reviewRoutes = require('./routes/reviewRoutes');// Importerar recensionsrutter

const app = express();// Skapar en Express-applikation

// Middleware
app.use(express.json());// Middleware för att parsa JSON-begäranden
app.use(cookieParser());// Middleware för att parsa cookies

// CORS-konfigurationen
const corsOptions = {
  origin: 'http://localhost:5173',// Tillåt begäranden från denna origin
  credentials: true, // Detta är nödvändigt för att skicka cookies eller headers
};

app.use(cors(corsOptions));// Använd CORS-middleware med konfigurerade alternativ

// MongoDB konnectionen
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected'))// Logga ett meddelande om anslutningen lyckas
  .catch((err) => console.log('DB not connected', err));// Logga ett felmeddelande om anslutningen misslyckas

// Använda rutter  
app.use('/', authRoutes);// Använd autentiseringsrutter
app.use('/', bookRoutes);// Använd bokrutter
app.use('/', reviewRoutes);// Använd recensionsrutter

const port = 8000;// Porten som servern kommer att lyssna på
app.listen(port, async () => {
  console.log(`Server on ${port}`);// Logga ett meddelande när servern är igång
});
