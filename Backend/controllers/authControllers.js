const bcrypt = require('bcrypt');// Importerar bcrypt för att hantera lösenordshashning
const User = require('../models/User');// Importerar User-modellen
const jwt = require('jsonwebtoken');// Importerar jsonwebtoken för att skapa och verifiera JWT

// Funktion för att registrera en ny användare
const signupUser = async (req, res) => {
    try {
        // Destrukturera name, email och password från request body
        const { name, email, password } = req.body;
        console.log('log: ', { name, email, password });

        // Kontrollera att namn finns
        if (!name) {
            return res.status(400).json({
                error: 'Ange ett giltigt namn'
            });
        }
        // Kontrollera att email finns
        if (!email) {
            return res.status(400).json({
                error: 'Ange en giltig e-postadress'
            });
        }
        // Kontrollera att lösenord finns och är minst 6 tecken
        if (!password || password.length < 6) {
            return res.status(400).json({
                error: 'Lösenord krävs och måste vara minst 6 tecken'
            });
        }

        // Kontrollera om användaren redan existerar
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: 'E-postadressen finns redan'
            });
        }

        // Hasha lösenordet
        const hashedPassword = await bcrypt.hash(password, 10);

        // Skapa en ny användare
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        console.log('Användare skapad:', user);

        return res.status(201).json({
            message: 'Användare skapad',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({
            error: 'Serverfel'
        });
    }
};

// Funktion för att logga in en användare
const loginUser = async (req, res) => {
    try {
      // Destrukturera email och password från request body
      const { email, password } = req.body;
      console.log('Login:', { email, password });
  
      // Kontrollera att email och password finns
      if (!email || !password) {
        return res.status(400).json({
          error: 'Fyll i både e-postadress och lösenord'
        });
      }

      // Hitta användaren i databasen
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: 'Felaktig e-postadress eller lösenord'
        });
      }
  
      // Kontrollera om lösenordet matchar
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          error: 'Felaktig e-postadress eller lösenord'
        });
      }
  
      // Generare token JWT 
      const token = jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      console.log('Login lyckades:', user);
  
      // Skicka tillbaka användarinformation
      return res.status(200).json({
        message: 'Login lyckades',
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
  
    } catch (error) {
      console.log('Error login:', error);
      return res.status(500).json({
        error: 'Serverfel'
      });
    }
  };

  // Funktion för att hämta användarens profil
  const getProfile = (req, res) => {
    const { token } = req.cookies;// Hämta token från cookies
    if (token) {
      // Verifiera token
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) throw err;
        res.json(user);// Skicka tillbaka användarens data
      });
    } else {
      res.json(null);// Om ingen token finns, skicka tillbaka null
    }
  };
  
  module.exports = { signupUser, loginUser, getProfile };// Exporterar funktionerna