import mongoose , { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber : {
        type : Schema.Types.ObjectId,   //Schema.Types.ObjectId and mongoose.Types.ObjectId are same thing and both are correct but the preferred version is Schema.Types.ObjectId
        ref : "User",
    },
    channel : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
},{timestamps : true})

export const Subscription = mongoose.model("Subscription" , subscriptionSchema)