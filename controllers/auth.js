//register, login, logout


import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendEmail} from "../middlewares/sendEmail.js"
import crypto from 'crypto';

const Register = async (req, res) => {
    try {
        const { userName, email, password, role, preferences = [] } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email }).select("+password");
        if (existingUser) {
            return res.status(303).json({ success: false, message: "User already exists. Please log in." });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({
            userName,
            email,
            password: hashedPassword,
            role,
            preferences,
        });

        await newUser.save();

        // Respond with success message and user data
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            User: newUser,
        });
    } catch (error) {
        console.error("Registration error:", error.message); // Log the specific error message
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};





const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const foundUser = await userModel.findOne({ email }).select("+password");
        if (!foundUser) {
            return res.status(404).json({ success: false, message: "User not found. Please register." });
        }

        console.log("Retrieved user:", foundUser); // Debug logging
        console.log("Stored hashed password:", foundUser.password); 

        const comparePassword = await bcrypt.compare(password, foundUser.password); 
        if (!comparePassword) {
            return res.status(401).json({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3 * 24 * 3600 * 1000,
        });

        return res.status(200).json({ success: true, message: "Login successful", user: foundUser, token });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};





const Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};





const forgetPassword = async (req,res) => {
    try{
        const user = await userModel.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const resetPasswordToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `${req.protocol}://${req.get("host")}/auth/password/reset/${resetPasswordToken}`;
        const message = `reset your password by clicking on the link below \n\n ${resetUrl}`

        try{
            await sendEmail({
                email: user.email,
                subject: "Reset Password",
                message,
            });
        return res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        });
        }catch(error){
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;
            await user.save();

            res.status(500).json({
                success: false,
                message: error.message,
            });
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}





const resetPassword = async (req, res) => {
    try {
        // Debug the incoming token
        console.log("Token received:", req.params.token);

        // Hash the received token
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        console.log("Hashed Token:", resetPasswordToken); // Debug hashed token

        // Find the user with the matching token and a valid expiration
        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or has expired",
            });
        }

        // Debug user found
        console.log("User found:", user);

        // Hash the new password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Update user password and clear reset fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // Save updated user
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};




export { Register, Login, Logout, forgetPassword, resetPassword };