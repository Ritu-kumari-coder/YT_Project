import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body;

    if(!title || !description){
        throw new ApiError(400, "Title and description both are required")
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if(!videoLocalPath || !thumbnailLocalPath){
        throw new ApiError(400, "Video file and thumbnail file both are required")
    }

    const videoFile = await uploadOnCloudinary(videoLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if(!videoFile || !thumbnail){
        throw new ApiError(500, "Failed to upload files on cloudinary")
    }

    const video = await Video.create({
        videoFile: videoFile?.url,
        thumbnail: thumbnail?.url,
        owner: req.user?._id,
        title, 
        description,
        duration: videoFile.duration,
        isPublished: true
    })
    
    const uploadedVideo = await Video.findById(video?._id);

    if(!uploadedVideo){
        throw new ApiError(500, "Something went wrong while uploading the video")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "Video uploaded successfully")
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(400, "Video not found")
    }

    return res
    .status(200)
    .json( 
        new ApiResponse(200, video, "Video fetched successfully")
    )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    const {title, description} = req.body

    const thumbnailLocalPath = req.file?.path;

    if(!thumbnailLocalPath && !title && !description){
        throw new ApiError(400, "Atleast one field is required")
    }

    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(400, "Video not found")
    }

    if(title) video.title = title;
    if(description) video.description = description;
    if(thumbnailLocalPath){
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
        if(!thumbnail) {
            throw new ApiError(500, "Failed to upload thumbnail on cloudinary")
        }

        video.thumbnail = thumbnail.url;
    } 

    await video.save({ validateBeforeSave: false});

    return res
    .status(201)
    .json(
        new ApiResponse(200, video, "Video updated successfully")
    )
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const existingVideo = await Video.findById(videoId)

    if(!existingVideo){
        throw new ApiError(400, "Video with given id does not exist")
    }

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                isPublished: !existingVideo.isPublished,
            }
        },
        {
            returnDocument: "after"
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "Publish status toggled successfully")
    )
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}