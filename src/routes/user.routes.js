import { loginUser, logoutUser, registerUser ,refreshAccessToken ,changeCurrentPassword ,getCurrentUser } from "../controllers/user.controller.js"
import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

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

export default routes