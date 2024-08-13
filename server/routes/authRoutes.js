const express = require('express');
const router = express.Router();
const { register, login, logout,  createPost, getAllPosts,getPost,updatePost,deletePost} = require('../controllers/authControllers');
const auth = require('../middlewares/authMiddlewares');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', auth, logout);
router.post('/posts',auth, createPost);
router.get('/posts',  getAllPosts);
router.get('/posts/:id', getPost);
router.put('/posts/:id',auth, updatePost);
router.delete('/posts/:id',auth, deletePost);

module.exports = router;