import { User } from "../models/user.models";
import { APIerror } from "../utils/APIerror";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from 'jsonwebtoken'

const verifyJWT = asyncHandler(async (req, res, next) => {
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
     if(!token) throw new APIerror(400 , "Unauthorized request")
         const decodedToken = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET)
       const user = await User.findById(decodedToken.userid).select("-password -refreshToken") 
       if(!user) throw new APIerror(401, "Invalid access token")
         req.user = user
      next()
   } catch (error) {
     throw new APIerror(400 , "INvalid access token")
   }

})