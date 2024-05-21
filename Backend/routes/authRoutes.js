const express = require('express');
const router = express.Router();
const  { signupUser, loginUser, getProfile } = require('../controllers/authControllers');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', getProfile)

module.exports = router;
