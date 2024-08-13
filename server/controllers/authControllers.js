const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Post=require('../models/post');
const posts = require('../models/post');
const { json } = require('express');
require('dotenv').config();
exports.register = async (req, res) => {
    const { name, email, password,phone, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            phone,
            role
        });
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            // { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: false });
               
                res.status(201).json({ token ,msg: 'Register successfully!'  });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user._id,
               
            },
        };
        console.log(payload);

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            // { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: false });
               
                res.status(200).json({ token,  name:user.name,
                    email:user.email });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Logged out' });
};

exports.createPost= async (req, res)=>{
    try{
        const {id, title, content}=req.body;
        const post=new Post({
            title, 
            content,
            createdBy:req.user.id
        })
        await post.save();
        res.status(201).json({"msg":"post created succesfully!"});

    }catch(error){
        console.error("created post error",error);
        res.json({"msg":"server error"});
    }
  
}
exports.getAllPosts=async (req, res)=>{
    try{
        const allPosts=await posts.find().populate({
            path:'createdBy'
    });
        res.status(200).json({allPosts});
    
    }catch(error){
        console.log("all posts", error);
        res.json({"msg":"server error"});
    }
   
}
exports.getPost=async (req, res)=>{
    try{
       const {id}=req.params;
    const post=await posts.findById(id);
       res.status(200).json(post);


    }catch(error){
        console.log("getPost",error);
    }
}
exports.updatePost=async (req, res)=>{
    const {title, content}=req.body;
    const {id}=req.params;
    const post=await posts.findByIdAndUpdate(id, {title, content}, {new:true, upsert:true});
    res.status(201).json({"msg":"update successfully", post});
}

exports.deletePost=async (req, res)=>{
   
    try{
        const {id}=req.params;
        const post=await posts.findByIdAndDelete(id);
        res.status(201).json({"msg":"deleted successfully!"});
    
    }catch(error){
        console.log("dlt post", error);
    }
}
