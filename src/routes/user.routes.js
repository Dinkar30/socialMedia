import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { changeCurrentPassword,
         changeProfilePic,
         getCurrentUser,
         getProfile,
         loginUser,
         logoutUser,
         refreshAccessToken,
         registerUser,
         updateUserProfile,
     } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(upload.single("profilePic"),registerUser);
router.route("/login").post(loginUser)
// secure routes

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/change-current-password").patch(verifyJWT,changeCurrentPassword)
router.route("/get-current-user").get(verifyJWT , getCurrentUser)
router.route('/get-profile/:username').get(verifyJWT,getProfile)
router.route('/update-user-profile').patch(verifyJWT,updateUserProfile)
router.route('/change-profile-pic').patch(verifyJWT,upload.single("profilePic"),changeProfilePic)
router.route('/refresh-access-token').patch(verifyJWT, refreshAccessToken)







export default router