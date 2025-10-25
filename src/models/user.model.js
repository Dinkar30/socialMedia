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
        trim: true,
        required: [true,"password required"]
    },
    refreshToken: {
        type: String
    },
    profilePic: {
        type: String
    }
},{timestamps: true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    console.log(this.password);
    
    this.password = await bcrypt.hash(this.password , 12);
        console.log(this.password);

    next(); 
 })

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password , this.password) 
}


userSchema.methods.generateAccessToken = function() {
    return  jwt.sign(
        {_id: this._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function() {
    return  jwt.sign(
        {_id: this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}



export const User = mongoose.model("User",userSchema)