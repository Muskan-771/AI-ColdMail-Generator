const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// Register a new user
router.post('/register',authController.register);

// Login a new user
router.post('/login',authController.login);

// Verify OTP
router.post('/verify-otp', authController.verifyOTP);

module.exports=router;