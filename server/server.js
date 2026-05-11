const express = require('express');
const dotenv= require('dotenv')
const connectDB = require('./config/db')
const authRoutes= require('./routes/authRoutes')
// const aiRoutes = require('./routes/aiRoutes')
const PORT = process.env.PORT || 3000;

//ENV Variables
require('dotenv').config();
//Connect to MongoDB
connectDB();

const app = express();
app.use('/api/auth', authRoutes)
// app.use('/api/ai', aiRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});



