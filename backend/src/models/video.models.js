import mongoose , {Schema} from "mongoose";

// A page based custom aggregate pagination library for Mongoose with customizable labels.
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    video : {
        type : String ,
        required : ["true" , "Video is required"]
    },
    thumbnail : {
        type : String,
        required : ["true" , "thumbnail is required"]
    },
    title : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        trim : true,
    },
    duration : {
        type : Number,
        default : 0,
    },
    views : {
        type : Number,
        default : 0,
    },
    isPublished : {
        type : Boolean,
        default : true,
    },
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : ["true" , "owner is required."]

    }

},{timestamps : true})
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("User" , videoSchema)