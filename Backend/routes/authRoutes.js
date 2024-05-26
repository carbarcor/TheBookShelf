const express = require('express');
const router = express.Router();
const  { signupUser, loginUser, getProfile, logoutUser } = require('../controllers/authControllers');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);

module.exports = router;
