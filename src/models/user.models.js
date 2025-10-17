import mongoose , {Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true,"password required"]
    },
    refreshToken: {
        type: String
    },
    profilePic: {
        type: String
    }
},{timestamps: true})


userSchema.pre()

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password , this.password) 
}


userSchema.methods.generateAccessToken = function(userid) {
    return  jwt.sign(
        {userid},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function(userid) {
    return  jwt.sign(
        {userid},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export const User = mongoose.model("User",userSchema)