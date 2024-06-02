const express = require('express');
const router = express.Router();
const  { signupUser, loginUser, getProfile, logoutUser } = require('../controllers/authControllers');

// Route för registrering av användare
router.post('/signup', signupUser);
// Route för inloggning av användare
router.post('/login', loginUser);
// Route för att hämta användarprofil
router.get('/profile', getProfile);
// Route för att logga ut användare
router.post('/logout', logoutUser);

module.exports = router;