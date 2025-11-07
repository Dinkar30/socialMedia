import { Post } from "../models/post.model.js";
import { APIerror } from "../utils/APIerror.js";
import { APIresponse } from "../utils/APIresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

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
    if(!post) throw new APIerror(400 , "post is missing")
    if(!post.likes.includes(userId)) post.likes.push(userId)
    else post.likes = post.likes.filter(_id => _id.toString() !== userId.toString())

    await post.save()

    return res.status(201)
              .json(new APIresponse(400 , post , "Liked post successfully"))

})

const addComment = asyncHandler(async (req,res) => {
    const {postId} = req.params
    const {texts} = req.body
    if(!postId) throw new APIerror(400 , "post is missing")
    if(!texts) throw new APIerror(400 , "Enter something to comment")
    const userId = req.user._id
    const post = await Post.findById(postId)
    if(!post) throw new APIerror(400 , "post is missing")
    post.comments.push({
        user: userId,
        text: texts,
    })
    await post.save()

    return res.status(201)
              .json(new APIresponse(400 ,post ,"comment added successfully"))
})

const viewComments = asyncHandler(async (req,res) => {
     const {postId} = req.params
     if(!postId) throw new APIerror(400 , "postId not found")
     const post = await Post.findById(postId).populate('comments.user')
     if(!post) throw new APIerror(400 , "no post found ")
     
    return res.status(200)
              .json(new APIresponse(200 ,{}, "you can now view comments"))
})

const getFeed = asyncHandler(async (req,res) => {
    const posts = await Post.find()
                            .sort({createdAt: -1})
                            .populate('author','username profilePic')
                            .populate('likes','username profilePic')
    return res.status(200)
              .json(new APIresponse(200 , {posts} , "presenting , your feed "))
})

const deletePost = asyncHandler(async (req,res) => {
    const {postId} = req.params
    const post = await Post.findById(postId)
    if(post.author?._id.toString() !== req.user._id.toString()) throw new APIerror(400 , "You are not authorized to delete the post")
    else await Post.findByIdAndDelete(postId)   // 2 db calls , needs optimization 
    
    return res.status(200)
              .APIresponse(200 ,{}, "deleted post successfully")    
})

const deleteComment = asyncHandler(async (req,res) => {
    const {postId , commentId} = req.params
    const post = await Post.findById(postId)
    if(!post) throw new APIerror(400 , "No post found")
    const comment =  post.comments.id(commentId)
    
    if(req.user._id.toString() !== post.author._id.toString() && req.user._id.toString() !== comment.user._id.toString()) 
        throw new APIerror(400 , "You are not authorized to delete the comment")  // only post author and commentor can delete the comment
    comment.remove()
    await post.save();

    return res.status(200)
              .json(new APIresponse(400 , {}, "Comment has been deleted successfully"))
})

const getPost = asyncHandler(async (req,res) => {
    const {postId} = req.params
    if(!postId) throw new APIerror(404 , "Post id not found")
    const post = await Post.findById(postId)
                           .populate('author' , 'username profilePic')
                           .populate('likes', 'username profilePic')
                           .populate({
                            path: 'comments.user',
                            select: 'username profilePic'
                           })

    if(!post) throw new APIerror(404 , "post not found")
    return res.status(200)
              .json(new APIresponse(200 , post , "got The post successfully"))

})




export {
    createPost,
    likePost,
    addComment,
    viewComments,
    getFeed,
    deletePost,
    deleteComment,
    getPost
    

}