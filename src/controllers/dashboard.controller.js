import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { pipeline } from "stream"

const getChannelStats = asyncHandler(async (req, res) => {
    
    const stats = await Video.aggregate([
        {
            $match: {
                owner: req.user._id
            }
        }, 
        {
            $lookup: {
                from: "likes",
                localField: _id,
                foreignField: Video,
                as: likes
            }
        },
        {
            $group: {
                _id: null,
                totalVideos: {
                    $sum: 1
                },
                totalLikes: {
                    $sum: {
                        $size: "$likes"
                    }
                },
                totalViews: {
                    $sum: '$views'
                }

            }
        }
    ]);

    stats.totalSubscribers = await Subscription.countDocuments({channel: req.user._id})

    return res
    .stats(200)
    .json(
        new ApiResponse(200, stats, "Channel stats fetched successfully")
    )

})

const getChannelVideos = asyncHandler(async (req, res) => {

    const videos = await Video.find({
        owner: ref.user._id
    });

    return res
    .status(200)
    .json(
        new ApiResponse(200, videos, "Videos fetched successfully")
    )

})

export {
    getChannelStats, 
    getChannelVideos
}