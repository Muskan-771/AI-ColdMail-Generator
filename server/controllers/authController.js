const { text } = require("express");
const User = require("../models/User");
const sendEmail = require('../utils/sendEmail.js');

exports.registerUser= async(req, res) => {
    // Logic to register a new user
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(password.length < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters '});
        }
        if(!/\S+@\S+\.\S+/.test(email)){
            return res.status(400).json({ message: 'Invalid email format '});
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({ message: 'Email already in use'})
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() +10 * 60 * 1000  // otp valid for 10 min

        const user = await User.create({username, email, password, otp, otpExpiry});
        res.status(201).json({ message: 'User registered successfully', user})


        //OTP Sending Logic
        try{

            await sendEmail({
                to: email,
                subject: 'Your OTP Code for AI COLD MAIL GENERATOR',
                text: `Your OTP Code is ${otp} . It is valid for 10 minutes only.`
            })

        }catch(error){
            console.log({ message: 'Error Sending OTP', error: error.message})
        }

    } catch (error) {
        
    }
}