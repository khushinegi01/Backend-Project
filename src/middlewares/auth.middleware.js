import { ApiError } from "../utils/ApiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req,_,next)=> {
    try {
        // getting token from the cookie for browser case and from header for android case.As the mobile cookies can't be accessed.
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        // if token doesn't exist throw error.
        if(!token){
            throw new ApiError(401 , "Unauthorised Access")
        }
    
        // decrypting the token to get user id for thejet token from which it is bean made.
        const decodedToken = jwt.verify(
            token ,
            process.env.ACCESS_TOKEN_SECRET
        )
    
        // making the call to db from fetching the user from user id just received from decodedToken
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        // if user doesn't exist throw error.
        if(!user){
            throw new ApiError(401 , "Unauthorised Access Token.")
        }
        // added user in req object.
        req.user = user;
        console.log("req.user._id:", req.user?._id);
        next()
    
    } catch (error) {
        throw new ApiError(401 , "Unauthorised Access Token!")
    }

})