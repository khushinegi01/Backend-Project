import mongoose from "mongoose"
import {Comment} from "../models/comment.models.js"
import { Video } from "../models/video.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    if(!videoId.trim()){
        throw new ApiError( 400 , "Invalid Video ")
    }
    const comments = await Comment.aggregate([
        {
            $match : {
                video : new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup : {
                from : 'users',
                localField : 'owner',
                foreignField : '_id',
                as : "owner",
                pipeline : [{
                    $project : {
                        username : 1 ,
                        avatar : 1 ,
                    }
                }]
            }
        },
        {
            $lookup : {
                from : "likes",
                localField : '_id',
                foreignField : "comment",
                as : "likes"
            }
        },
        {
            $addFields : {
                likedby : {
                    $size : "$likes"
                },
                isLikedByUser : {
                    $in : [
                        new mongoose.Types.ObjectId(req.user._id),
                        {
                            $map : { 
                                input : "likes",
                                as : "like",
                                in : "$$like.likedBy"
                            }
                        }
                    ]
                },
                owner : {
                    $first : '$owner' , 
                }
            }
        }
    ])
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}