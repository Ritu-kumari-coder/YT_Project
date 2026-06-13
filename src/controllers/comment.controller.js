import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    const aggregate = Comment.aggregate([
        {
            $match: {
                video: videoId
            }
        }
    ])

    const options = {
        page: Number(page),
        limit: Number(limit)
    }

    const comments = await Comment.aggregatePaginate({
        aggregate, 
        options
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, comments, "Comment added successfully")
    )

})

const addComment = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    const {content} = req.body;

    const comment = await Comment.create({
        content,
        video: new mongoose.Types.ObjectId(videoId),
        owner: new mongoose.Types.ObjectId(req.user._id)
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, comment, "Comment added successfully")
    )
})

const updateComment = asyncHandler(async (req, res) => {
    
    const {commentId} = req.params;
    const {content} = req.body;

    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content: content
            }
        },
        {
            returnDocument: "after"
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, comment, "Comment updated successfully")
    )

})

const deleteComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params;

    await Comment.findByIdAndDelete(commentId)
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}