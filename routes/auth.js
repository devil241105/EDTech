import express from 'express'
import { Login,Register, Logout, forgetPassword, resetPassword } from '../controllers/auth.js'

const AuthRoutes = express.Router()

AuthRoutes.post('/register', Register)
AuthRoutes.post('/login', Login)
AuthRoutes.post('/logout', Logout)
AuthRoutes.post('/forget/password', forgetPassword)
AuthRoutes.post('/password/reset/:token', resetPassword)

export default AuthRoutes