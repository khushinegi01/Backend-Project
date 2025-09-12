import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
     loginUser,
     logoutUser, 
     registerUser ,
     refreshAccessToken ,
     changeCurrentPassword ,
     getCurrentUser, 
     updateUserDetails, 
     updateUserAvatar, 
     updateUserCoverImage,
     getUserChannel,
     getWatchHistory,
} from "../controllers/user.controller.js"

const routes = Router()

routes.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }]),
    registerUser
)

routes.route("/login").post(loginUser)

//secured routes
routes.route("/logout").post( verifyJWT , logoutUser) // injected our custom middleware (verifyJWT) before logoutUser
routes.route("/refresh-token").post(refreshAccessToken)

routes.route("/getUser").get(verifyJWT ,getCurrentUser)

routes.route("/update-user-details").patch(verifyJWT ,updateUserDetails)

routes.route("/update-user-password").patch(verifyJWT ,changeCurrentPassword)

routes.route("/update-user-avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

routes.route("/update-user-coverImage").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)

routes.route("/user-channel/:username").get(verifyJWT, getUserChannel)

routes.route("/user-watchHistory").get(verifyJWT, getWatchHistory)
export default routes