const express = require('express');
const router = express.Router();
const signupUser = require('../controllers/authControllers'); // Assicurati che il percorso sia corretto

router.post('/signup', signupUser);

module.exports = router;
