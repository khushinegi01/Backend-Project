import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrorHandler.js"
import { User } from "../models/user.models.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponseHandler.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const generateRefreshTokenAndAccessToken = async function(userId){
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken() // called the method from the user model
        const refreshToken = await user.generateRefreshToken() // called the method from the user model

       user.refreshToken = refreshToken;
       await user.save({ validateBeforeSave: false });
       return {accessToken , refreshToken}
    }
    catch(error) {
        throw new ApiError(500 , "Something Went Wrong in Logging In User :: ")
    }

}

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
        let avatarLocalPath = req.files?.avatar[0]?.path
        let coverImageLocalPath = ""; 
        if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
            coverImageLocalPath = req.files?.coverImage[0]?.path
        } 


        if(!avatarLocalPath){
            throw new ApiError(400 , "Avatar is required.")
        }

        let avatar = await uploadToCloudinary(avatarLocalPath)
        let coverImage = await uploadToCloudinary(coverImageLocalPath)
        
        if(!avatar){
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
   const { username, email , password } = req.body
   if(!username || !email){
        throw new ApiError(401 , "Username or Email is Required.")
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
   const  {accessToken , refreshToken} = await generateRefreshTokenAndAccessToken(user._id)  // called the function to generate the accessToken and refreshToken 

   // creating options for the cookies
   const options = {
        httpOnly : true,
        // secure : false, // secure : true ,cookie will only be saved if the request is over HTTPS.
        // sameSite: "None" // if frontend and backend are on different ports
        secure : true,
   }

   /* removed the password and refreshToken from the user data. This can be done in 2 ways:
        1.) edit the user we fetched before if db call is expensive.
        2.) make another call to db for fetching the data again.
   */
   const loggedUser = await User.findById(user._id).select(
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
        },
        "User Logged In Successful."
    )
   )
})

const logoutUser = asyncHandler(async (req , res)=>{

   await User.findByIdAndUpdate(
    req.user._id,
    { refreshToken: null }, // don't use undefined it is ignored by the mongodb and value is not updated
    { new: true }
)

   // creating options for the cookies
   const options = {
        httpOnly : true,
        secure : true
   }

   res
   .status(200)
   .clearCookie("accessToken" ,options)
   .clearCookie("refreshToken" , options)
   .json(
    new ApiResponse(
        200,
        "User Logout Successful."
    )
   )
})

// refreshAccessToken will generate a new accessToken for the logged user so that they don't need to login again and again. 
const refreshAccessToken = asyncHandler(async(req ,res)=>{

    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    
    if(!incomingRefreshToken){
        throw new ApiError(401 , "Unauthorised Request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401 , "Invalid Token")
        }
        
        if(incomingRefreshToken !== user.refreshToken){
            throw new ApiError(401 , "Refresh token expired or used.")
        }

        let {accessToken , refreshToken } = await generateRefreshTokenAndAccessToken(user._id)
        
        const options = {
            httpOnly : true,
            secure : true,
        }

        res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken", refreshToken ,options)
        .json(
            new ApiResponse(
                200 , 
                {
                    accessToken,
                    refreshToken,
                    
                },
                "Access Token Refreshed."
            )
        )
    } catch (error) {
        throw new ApiError(401 , error?.message || "Invalid Refresh Token.")
    }    
})

const changeCurrentPassword = asyncHandler(async (req ,res)=>{
    const {currentPassword , newPassword} = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400 , "Invalid Password.")
    }

//    Loads the user into memory as a full JavaScript object (user).
//    Updates the password field directly.
//    Calls .save() to write changes to the database.
    user.password = newPassword 
    await user.save({validateBeforeSave : false})

    res.status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password Changed Successfully."
        )
    )
})

// since the login user is already existing in the req object we can fetch that for there.
const getCurrentUser = asyncHandler(async (req, res)=>{
    
    return res.status(200)
    .json(
        new ApiResponse(
            200 , 
            req.user,
            "Current User Fetched"
        )
    )
})

const updateUserDetails = asyncHandler(async (req, res)=>{
    const { fullname , email } = req.body 

    if(!fullname || !email){
        throw new ApiError(
            400 , 
            "All Fields Are Required."
        )
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                fullname,
                email
            }
        },
        {new : true}
    ).select("-password -refreshToken")

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "User Updated Successfully."
        )
    )
})

const updateUserAvatar = asyncHandler(async (req, res)=>{
    const avatarLocalPath = req?.file.path

    if(!avatarLocalPath){
        throw new ApiError(400 , "Avatar File Is Missing.")
    }
    let avatar = await uploadToCloudinary(avatarLocalPath)
    console.log("Avatar received from the cloudinary :: ",avatar)
    if(!avatar){
        throw new ApiError(500 , "Error While Uploading Avatar.")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                avatar : avatar.url
            }
        },
        {new : true}
    ).select("-password -refreshToken")

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Avatar Update Successfully"
        )
    )

})

const updateUserCoverImage = asyncHandler(async (req, res)=>{
    const coverImageLocalPath = req?.file.path

    if(!coverImageLocalPath){
        throw new ApiError(400 , "Avatar File Is Missing.")
    }
    const coverImage = await uploadToCloudinary(coverImageLocalPath)

    if(!coverImage){
        throw new ApiError(500 , "Error While Uploading Avatar.")
    }

    const user = await User.findByIdAndUpdate(
        req?.user._id,
        {
            $set : {
                coverImage : coverImage.url
            }
        },
        {new : true}
    ).select("-password -refreshtoken ")

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Avatar Update Successfully"
        )
    )

})

const getUserChannel = asyncHandler(async (req,res)=>{
    const username = req.params.username
    if(!username?.trim()){
        throw new ApiError(400 , "Username Is Not Valid" )
    }
    const channel = await User.aggregate(
        [{
            $match : {
                username : username.toLowerCase()
            }
        },
        {
            $lookup : {
                from : "subscriptions",
                localField : "_id",
                foreignField : "channel",
                as : "subscribers"
            }
        },
        {
            $lookup : {
                from : "subscriptions",
                localField : "_id",
                foreignField : "subscriber",
                as : "channelSubscribedByUs"
            }
        },
        {
            $addFields : {
                subscriberCount : {
                    $size : "$subscribers"
                },
                subscribedToCount : {
                    $size : "$channelSubscribedByUs"
                },
                isSubscribed : {
                    $cond : {
                        if : {
                            $in : [req.user._id , "$subscribers.subscriber"]
                        },
                        then : true,
                        else : false,                        
                    }
                }
            }
        },
        {
            $project : {
                username : 1 ,
                fullname : 1 ,
                email : 1 ,
                coverImage : 1,
                avatar : 1 ,
                subscriberCount : 1 ,
                subscribedToCount : 1,
                isSubscribed : 1,
            }
        }]
    )

    if(!channel?.length){
        throw new ApiError(404 , "Channel Not Found! ")
    }
    console.log("channel :: " , channel)
    return res
    .status(200)
    .json(
        new ApiResponse(
            200 , 
            channel,
            "User Channel Fetched Successfully!"
        )
    )
})
 
const getWatchHistory = asyncHandler ( async (req,res)=>{
    const user = await User.aggregate(
        [{
            $match : {
                user : new mongoose.Types.ObjectId(req.user._id) 
            }
        },
        {
            $lookup : {
                from : 'videos',
                localField : "watchHistory",
                foreignField : "_id",
                as : "watchHistory",
                pipeline : [
                    {
                        $lookup : {
                            from : 'users',
                            localField : 'owner',
                            foreignField : '_id',
                            as : "owner",
                            pipeline : [
                                {
                                    $project : {
                                        fullname : 1,
                                        email : 1,
                                        username : 1,
                                    }
                                }
                            ]
                        },
                    },
                    {
                        $addFields : {
                            owner : {
                                $first : "$owner"
                            }
                        }  
                    }                 
                ],
                              
            }
        }]
    )
    console.log("user :: " , user)
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "User Watch History is Retreived"
        )
    )
})

export {
     registerUser,
     loginUser,
     logoutUser,
     refreshAccessToken,
     changeCurrentPassword,
     getCurrentUser,
     updateUserDetails,
     updateUserAvatar,
     updateUserCoverImage,
     getUserChannel,
     getWatchHistory,
    }