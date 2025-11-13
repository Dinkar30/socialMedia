import { Router } from "express";
import { Post } from "../models/post.model.js";
import { addComment,
    createPost,
    deletePost,
    getFeed,
    getPost,
    likePost,
    viewComments 
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";



const router = Router()

router.route("/create-post").post(verifyJWT,upload.single("content"), createPost)
router.route("/like-post/:postId").post(verifyJWT , likePost)
router.route("/add-comment/:postId").post(verifyJWT , addComment)
router.route("/view-comments/:postId").get(viewComments)
router.route("/feed").get( getFeed)
router.route("/delete-post/:postId").patch(verifyJWT , deletePost)
router.route("/:postId/delete-comment/:commentId").post(verifyJWT , addComment)
router.route("/get-post/:postId").get(verifyJWT , getPost)




export default router