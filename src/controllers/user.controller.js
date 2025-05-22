import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrorHandler.js"
import { User } from "../models/user.models.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponseHandler.js"

const registerUser = asyncHandler(async (req ,res)=>{
        /* Steps to register user :

            - get data from the frontend
            - validate them if any required field is empty
            - check if user already exits.
            - check for the image or file for avatar and coverImage
            - upload file temparorily in the server for some time.
            - upload file in the cloudinary and fetch the string url of the image.
            - create object with user info and urls.
            - save data in the mongo.
            - check for error.
            - send res and status code to frontend.

        */
        const { username , email , fullname ,  password } = req.body;
        console.log(req.body)

        // for checking the user reqired fields not empty
        if(
            [username , email , fullname , password].some((field)=> field?.trim() === "")
        ){
            throw new ApiError(400, "All fields are required.")
        }

        // check if the user exist already 
        const existUser = await User.findOne({
            $or:
            [{username},{email}]
        })
        
        if(existUser){
            throw new ApiError(409 , "User name or email already exists.")
        }
        // for checking if the avatar field
        console.log(req.files)
        let avatarLocalPath = req.files?.avatar[0]?.path
        console.log(avatarLocalPath)
        let coverImageLocalPath = ""; 
        if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
            coverImageLocalPath = req.files?.coverImage[0]?.path
        } 
        console.log("coverImage :: ",coverImageLocalPath)


        if(!avatarLocalPath){
            throw new ApiError(400 , "Avatar is required.")
        }

        let avatar = await uploadToCloudinary(avatarLocalPath)
        let coverImage = await uploadToCloudinary(coverImageLocalPath)
        
        if(!avatar){
            console.log(avatar)
            return new ApiError(400 , "Avatar is required.")
        }

        const user =  await User.create({
            fullname,
            username : username.toLowerCase(),
            email,
            password,
            avatar : avatar.url,
            coverImage : coverImage?.url || ""
        })

        // just to make sure the user is created
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken" // mention the field that you don't want.
        )

        if(!createdUser){
            throw new ApiError(500 , "Something went wrong in registering user.") // 500 for Internal Server Error
        }

        return res.status(201).json(
            new ApiResponse(200 ,  createdUser , "User Registered Successfully.") // 201 for created
        ) 


})

export { registerUser }