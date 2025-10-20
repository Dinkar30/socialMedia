import { Post } from "../models/post.model";
import { APIerror } from "../utils/APIerror";
import { APIresponse } from "../utils/APIresponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadToCloudinary } from "../utils/cloudinary";

const createPost = asyncHandler(async (req , res) => {
    // import image from req.files / frontend
    // upload image to cloudinary , multer 
    // get captions from req.body 
    // give response.url and save it to user database 
    // return it , that's it

    const {caption} = req.body
    
    const postLocalPath = req.file?.path 
    if(!postLocalPath) throw new APIerror(400 , "please select an image first")
        const post = await uploadToCloudinary(postLocalPath)
    if(!post) throw new APIerror(500 , " could not uplaod the post ,sorry")

    

    const createdPost = await Post.create({
        caption,
        content: post.url,
        author: req.user?._id

    })

   return res.status(201)
            .json(new APIresponse(201 , createdPost , "post created successfully"))
})


const likePost =asyncHandler(async (req, res) => {
    const {postId} = req.params
    if(!postId) throw new APIerror(400 , "post is missing")
    const userId = req.user._id
    const post = await Post.findById(postId)
    if(!post.likes.includes(userId)) post.likes.push(userId)
    else post.likes = post.likes.filter(_id => _id.toString() !== userId.toString())

    await post.save()

    return res.status(201)
              .json(new APIresponse(400 , {} , "Liked post successfully"))

})

