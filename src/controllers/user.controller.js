import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerror } from "../utils/APIerror.js";
import { User } from "../models/user.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import {APIresponse} from "../utils/APIresponse.js"


const generateAccessAndRefreshToken = async (userid) => {
   try {
     const user = await User.findById(userid)
     const accessToken = user.generateAccessToken(userid)
     const refreshToken = user.generaterefreshToken(userid)
     user.refreshToken = refreshToken
     await user.save()

     return {accessToken, refreshToken}

   } catch (error) {
    throw new APIerror(500 , "something went wrong while generating refresh and access token")
   }
}



const registerUser = asyncHandler(async (req,res) => {
     const {username , email , password } = req.body
     if(!username || !email || !password) throw new APIerror(400 , "All fields are mandatory")
      const userExists = await User.findOne({
        $or: [{email,username}]
      })
     if(userExists) throw new APIerror(400 , "a user already exists with this email / username")
     const profilePictureLocalPath = req.file?.path
     if(!profilePictureLocalPath) throw new APIerror(401 , "profile picture not uploaded")
     const profilePic = await uploadToCloudinary(profilePictureLocalPath)
    if(!profilePic) throw new APIerror(401 , "profile picture could not be uploaded")

      
    const user = await User.create({
        username,
        email,
        password,
        profilePic: profilePic.url
    })

    const userCreated = await User.findById(user._id)
                                  .select("-password -refreshToken")
  
  return res
  .status(201)
  .json(new APIresponse(201, userCreated , "User has been registered successfully"))
})

const loginUser = asyncHandler(async (req,res) => {
    const {username , email , password} = req.body
    if(!(username || email)) throw new APIerror(400 , "atleast enter username or email")
    const user = await User.findOne({
  $or: [{email},{password}]
}) 
 if(!user) throw new APIerror(400 , "user doesn't exist , register first")

  const isPasswordValid = user.isPasswordCorrect(password)
  if(!isPasswordValid) throw new APIerror(400, "Invalid user credentials")
    const {accessToken, refreshToken} =  await generateAccessAndRefreshToken(user._id)
    const loggedinUser = await User.findById(user._id).select("-password -refreshToken")

   

  return res.status(200)
  .cookie("accessToken",accessToken , options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new APIresponse(200 , 
      {
      user: loggedinUser , refreshToken , accessToken
      },
      "user loggedin successfully"
    )
  )
    
})

const logoutUser = asyncHandler(async (req,res) => {
     await User.findByIdAndUpdate(req.user._id,
           {
            $set: {
              refreshToken: undefined
            }
           },
           {
            new: true
           }
     )
     const options = {
      httpOnly: true,
      secure: true
     }

     return res.status(201)
     .clearCookie("accessToken",options)
     .clearCookie("refreshToken", options)
     .json(new APIresponse(201, {}, "user logged out"))
})




export {registerUser,
        loginUser,
        logoutUser,
        createPost
}