import { v2 as cloudinary } from "cloudinary";
import fs from "fs"


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECRET_KEY,
    });
    
    // Now creating the funtion for uploading the image 
    const uploadToCloudinary = async (localFilePath)=>{
        try {
            if(!localFilePath) return null
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type : "auto"
            })
            // console.log("Cloudinary :: response :: ", response)
            // console.log("File upload to cloudinary :: File url ::" , response.url)
            fs.unlinkSync(localFilePath)  // this will delete the temporary stored file 
            return response
        }
        catch(error) {
            fs.unlinkSync(localFilePath)
            console.log("Error occured during upload :: ", error)
        }
    }  

export {uploadToCloudinary }