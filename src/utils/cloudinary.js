import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { ApiError } from "./ApiError";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath){
            return null;
        }

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        //file has been uploaded successfully
        // console.log(`File is uploaded on cloudinary: `, response);
        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {
        console.log("Cloudinary error: ", error);
        fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the iupload operation got failed
        return null;
    }
}

const deleteFromCloudinary = async (sourceId) => {
    try {
        if(!sourceId){
            return null;
        }

        const response = await cloudinary.uploader.destroy(localFilePath, {
            resource_type: "auto"
        });

        return response;

    } catch(error) {
        console.log("Cloudinary delete error", error);
        return null;
    }
}

export {uploadOnCloudinary, deleteFromCloudinary};
