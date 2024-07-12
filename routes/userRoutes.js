const express = require('express');
const { registerUser, loginUser, getloginUser, getregisterUser } = require('../controller/userController');
// const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

// router.post('/register', registerUser)

// router.post('/login', loginUser)

// router.get('/current', validateToken /*,currentUser */ )
router.post('/register', registerUser); // Handle registration POST request
router.post('/login', loginUser); // Handle login POST request
router.get('/register', getregisterUser); 
router.get('/login', getloginUser);

module.exports = router;