import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter a name"],
  },


  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },

  role: {
    type: String,
    enum: ["undergraduate", "master"],
    required: true,
  },

  preferences: [String], // Subjects or topics of interest, e.g., ["AI", "Math"]
  
  studyGroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudyGroup", // Links to StudyGroup Schema
  },

  resources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource", // Links to Resource Schema
    },
  ],

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  lastLogin: {
    type: Date,
},

loginStreak: {
    type: Number,
    default: 1,  // Default streak starts at 1
},
});

// Generate a password reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;//15 min

  return resetToken;
};




const userModel = mongoose.model("User", userSchema);

export default userModel;
