import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content} = req.body

    const tweet = await Tweet.create({
        content,
        owner: new mongoose.Types.ObjectId(req.user._id)
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, tweet, "Tweet created successfully")
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets

    const tweets = await Tweet.find({owner: req.user._id})

    return res
    .status(200)
    .json(200, tweets, "Tweets fetched successfully")
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {tweetId} = req.params
    const {content} = req.body

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId, 
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
    .json(200, tweet, "Tweet updated successfully")
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {tweetId} = req.params

    await Tweet.findByIdAndUpdate(tweetId)

    return res
    .status(200)
    .json(200, {}, "Tweet deleted successfully")
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}