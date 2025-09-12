import mongoose , { Schema } from "mongoose";
// A page based custom aggregate pagination library for Mongoose with customizable labels.
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
    {
        video : {
            type : Schema.Types.ObjectId , 
            ref : 'Video'
        },
        onwer : {
            type : Schema.Types.ObjectId , 
            ref : 'User'
        },
        content : {
            type : String , 
            required : true,
        },
    },
    {
        timestamps : true
    }
)
commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model("Comment" , commentSchema)