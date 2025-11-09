import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerror } from "../utils/APIerror.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import {APIresponse} from "../utils/APIresponse.js"
import { Post } from "../models/post.model.js";
import jwt, { decode } from 'jsonwebtoken';


const generateAccessAndRefreshToken = async (userid) => {
   try {
     const user = await User.findById(userid)
     const accessToken = user.generateAccessToken()
     const refreshToken = user.generateRefreshToken()
     user.refreshToken = refreshToken
     await user.save({ validateBeforeSave: false})

     return {accessToken, refreshToken}

   } catch (error) {
    console.log("error in generating tokens", error)
  }
}



const registerUser = asyncHandler(async (req,res) => {
      const {username , email ,  password} =  req.body
    

    if( [username, email ,  password].some((field) => field?.trim() === "")){
        throw new APIerror(400, "All fields are required");
    }
     const userExists = await User.findOne({
        $or: [{email,username}]
      })
     if(userExists) throw new APIerror(400 , "a user already exists with this email / username")
     const profilePictureLocalPath = req.file?.path
    
     if(!profilePictureLocalPath) throw new APIerror(401 , "profile picture not uploaded")
     const profilePic = await uploadToCloudinary(profilePictureLocalPath)
    if(!profilePic) throw new APIerror(500 , "profile picture could not be uploaded")

    const user = await User.create({
        username: username,
        email: email,
        password: password,
        profilePic: profilePic.url
    })
    const userCreated = await User.findById(user._id)
                                  .select("-password ")
  
  return res
  .status(201)
  .json(new APIresponse(201, userCreated , "User has been registered successfully"))
})

const loginUser = asyncHandler(async (req,res) => {
  
    const {  username , email , password } = req.body ;
    if(!(username || email)) throw new APIerror(400 , "atleast enter username or email")
    const user = await User.findOne({
       $or: [{username}, {email}]
    }) 
 if(!user) throw new APIerror(400 , "user doesn't exist , register first")

  const isPasswordValid = await user.isPasswordCorrect(password)
  // console.log(password);
  // console.log(isPasswordValid);
  // console.log(user.password);
  // console.log(user._id)
  
  
  if(!isPasswordValid) throw new APIerror(400, "Invalid user credentials")
    console.log(generateAccessAndRefreshToken(user._id));
    
    const {accessToken, refreshToken} =  await generateAccessAndRefreshToken(user._id)
    const loggedinUser = await User.findById(user._id).select("-password -refreshToken")

   const options = {
      httpOnly: true,
      secure: true
   }

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

const refreshAccessToken = asyncHandler(async (req,res) => {
  
   const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
   if(!incomingRefreshToken) throw new APIerror(401 , "Unauthorized request")
    const decodedToken = jwt.verify(incomingRefreshToken , process.env.REFRESH_TOKEN_SECRET)
  const user = await User.findById(decodedToken._id)
  if(!user) throw new APIerror(400 , "Invalid refresh token")
    if(incomingRefreshToken !== user.refreshToken) throw new APIerror(401 , "refresh token expired")
      const {newAccessToken , newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    const options = {
      httpOnly: true,
      secure: true
    }

    return res.status(200)
    .cookie("accessToken",newAccessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(new APIresponse(200 , {
       accessToken: newAccessToken,
       refreshToken: newRefreshToken
    }, "refreshed the access token successfully"))
   
})

const changeCurrentPassword = asyncHandler(async (req,res) => {
    const {oldPassword, newPassword} = req.body
    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect) throw new APIerror(400 , "invalid old password")

        user.password = newPassword
        await user.save()

    return res
    .status(200)
    .json(new APIresponse(200, "password changed successfully"))


})

const getCurrentUser = asyncHandler(async (req,res) => {
    return res
           .status(200)
           .json(new APIresponse(200, req.user , "User fetched Successfully"))
} )

const getProfile = asyncHandler(async (req,res) => {
       const {username } = req.params
       const account = await User.findOne({username}).select('-password -refreshToken')
       if(!account) throw new APIerror(404 , "user not found")
       const posts = await Post.find({author: account._id})  
                               .sort({createdAt: -1})
                               .select('caption content createdAt')
                               .populate('author', 'username avatar')    
                               
        const profile = {
          user: account,
          posts: posts,
          postsCount: posts.length
        }

      return res.status(200)
                .json(new APIresponse(200 , profile , "fetched profile successfully"))

})

const updateUserProfile = asyncHandler(async (req,res) => {
      const {username , email} = req.body
      if(!(email || username)) throw new APIerror(400 , "please select atleast one field to update")
      const user = await User.findByIdAndUpdate(req.user._id, 
                   { $set: {username , email} } ,
                        { new: true}
      ).select('-password')

    return res.status(200)
              .json(new APIresponse(200 , user , "account details updated successfully"))
})

const changeProfilePic = asyncHandler(async (req,res) => {
     const profilePictureLocalPath = req.file?.path
     if(!profilePictureLocalPath) throw new APIerror(400 , "avatar file is missing")
      const profilePic = await uploadToCloudinary(profilePictureLocalPath)
     if(!profilePic) throw new APIerror(400 , "error while updating the profile picture")
      const user = await User.findByIdAndUpdate(req.user._id, 
                                    {$set: {profilePic: profilePic.url}},
                                    {new: true}
       )
       return res.status(200)
                  .json(new APIresponse(200 , user, "changed profile pic successfully"))
})

export {registerUser,
        loginUser,
        logoutUser,
        changeCurrentPassword,
        getCurrentUser,
        getProfile,
        updateUserProfile,
        changeProfilePic,
        refreshAccessToken

}