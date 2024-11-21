import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connected');
    } catch (err) {
        console.log('DB connection error:', err);
    }
}
connectDB();