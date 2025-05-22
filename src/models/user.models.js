// Schema is imported to reduce the code mongoose.Schema to new Schema()
import mongoose , {Schema} from "mongoose";

// creating token to validate user
import jwt from "jsonwebtoken";

// for encrypting and decrypting the password in db
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username : {
        type : String,
        required : ["true" , "user name is required."],
        unique : true,
        trim : true,
        lowercase : true,
        index : true    
    },
    email : { 
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    fullname : {
        type : String,
        required : true ,
        index : true
    },
    avatar : {
        type : String,
        required : true,
    },
    coverImage : {
        type : String,
    },
    password : {
        // we will use bcrypt here.
        type : String,
        required : ["true" , "Password is required."],
    },
    refreshToken : {
        type : String,
        required : true,
    },
    watchHistory : [{
        type : mongoose.Types.ObjectId,
        ref : "Video",
    }]
},{timestamps : true})

// npm pre hook has been used to encrypt the password on modification before saving user.
userSchema.pre("save" , async function (next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password , 10)
    next()
})


//custom method can also be injected in model using method 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

// custom methods/functions for generating the token 
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        username : this.username,
        fullname : this.fullname,
        email : this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User = mongoose.model("User" , userSchema)