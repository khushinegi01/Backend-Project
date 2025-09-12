import mongoose from "mongoose";
const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`Databse connected with backend :: ${connectionInstance.connection.host}`)
    }
    catch(error) {
        console.log("Error in connecting" , error)
        process.exit(1) //method instructs Node.js to terminate the process synchronously with an exit status of code
    }
}
export default connectDB;