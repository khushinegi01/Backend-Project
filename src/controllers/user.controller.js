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

const generateRefreshTokenAndAccessToken = async function(userId){
    try {
        const user = User.findById(userId)
        const accessToken = await user.generateAccessToken() // called the method from the user model
        const refreshToken = await user.generateRefreshToken() // called the method from the user model

       user.refreshToken = refreshToken;
       await user.save({ validateBeforeSave: false });

        return {accessToken , refreshToken}
    }
    catch(error) {
        throw new ApiError(500 , "Something Went Wrong in Logging In User")
    }

}

const loginUser = asyncHandler(async (req ,res)=>{
    /*
        Steps to login the user 
        - get the credentials from the users
        - check if credentail is empty
        - check the password
        - check the credentials from mongo using User class.
        - generate the tokens and save to db.
        - error handling with ApiError and response through ApiResponse.
    */
   const [username, email , password] = req.body

   if(!username || !email){
        throw new ApiError(401 , "Username and Email is Required.")
   }

   const user = await User.findOne({
    $or:
    [{username},{email}]
   })

   if(!user){
    throw new ApiError(401 , "Invalid User Credentials.")
   }
   // called the method from the user model (isPasswordCorrect)
   const isPasswordValid = await user.isPasswordCorrect(password) // return true and false:

   if(!isPasswordValid){
        throw new ApiError(401 , "Invalid Password.")
   }

   const [ accessToken , refreshToken ] = await generateRefreshTokenAndAccessToken(user._id)  // called the function to generate the accessToken and refreshToken 

   // creating options for the cookies
   const options = {
        httpOnly : true,
        secure : true
   }

   /* removed the password and refreshToken from the user data. This can be done in 2 ways:
        1.) edit the user we fetched before if db call is expensive.
        2.) make another call to db for fetching the data again.
   */
   const loggedUser = User.findById(user._id).select(
    "-password -refreshToken"
   )

   res
   .status(200)
   .cookie("accessToken" , accessToken , options)
   .cookie("refreshToken" , refreshToken , options)
   .json(
    new ApiResponse(
        200,
        {
            accessToken ,refreshToken , loggedUser
        }
    )
   )
})

export {
     registerUser,
     loginUser 
    }