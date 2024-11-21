import express from 'express'
import { getUserProfile, updateUserPreferences } from '../controllers/user.js'
import {jwtAuthMiddleware} from "../middlewares/jwt.js"
const userRoutes = express.Router()

userRoutes.get('/me',jwtAuthMiddleware, getUserProfile);
userRoutes.get('/update/preference',jwtAuthMiddleware, updateUserPreferences);

export default userRoutes