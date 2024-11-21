import express from 'express'
import { createPost, getAllPosts, deletePost, likeAndUnlikePost, getPostOfFollowing, commentOnPost, deleteComment } from '../controllers/post.js'
import {jwtAuthMiddleware} from "../middlewares/jwt.js"
const postRoutes = express.Router()

postRoutes.get('/posts',jwtAuthMiddleware, getAllPosts);
postRoutes.post('/posts/create',jwtAuthMiddleware, createPost);
postRoutes.delete('/posts/:id',jwtAuthMiddleware, deletePost);
postRoutes.post('/post/:id',jwtAuthMiddleware, likeAndUnlikePost);
postRoutes.get('/post/following',jwtAuthMiddleware, getPostOfFollowing);
postRoutes.put('/post/comment/:id',jwtAuthMiddleware, commentOnPost); 
postRoutes.delete('/post/comment/:id',jwtAuthMiddleware, deleteComment);


export default postRoutes