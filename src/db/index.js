import mongoose from "mongoose";
const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`Databse connected with backend :: ${connectionInstance.connection.host}`)
    }
    catch(error) {
        console.log("Error in connecting" , error)
    }
}
export default connectDB;