import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { changeCurrentPassword,
         loginUser,
         logoutUser,
         registerUser,

     } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(upload.single("profilePic"),registerUser)
router.route("login").post(loginUser)
// secure routes

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/change-current-password").patch(verifyJWT,changeCurrentPassword)
router.route("get-current-user").get







export default router