const express=require('express');
const dotenv=require('dotenv');
const cookie_parser=require('cookie-parser');
const cors=require('cors');
const authRoutes= require('./routes/authRoutes.js');

const connectDB=require('./config/connectDB.js');

const app=express();
dotenv.config();
connectDB();


app.use(express.json());
app.use(cookie_parser());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true
}));

app.use('/api', authRoutes);


module.exports=app;