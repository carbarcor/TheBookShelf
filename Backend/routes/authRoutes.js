const express = require('express');
const router = express.Router();
const  { signupUser, loginUser } = require('../controllers/authControllers'); // Assicurati che il percorso sia corretto

router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router;
