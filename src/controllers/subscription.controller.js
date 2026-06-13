import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    const subscription = await Subscription.findOne({channel: channelId, subscriber: req.user._id});

    if(!subscription) {
        await Subscription.create({
            channel: new mongoose.Types.ObjectId(channelId),
            subscriber: new mongoose.Types.ObjectId(req.user._id)
        })
    } else {
        await Subscription.deleteOne({_id: subscription._id});
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Subscription toggled successfully")
    )
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    const subscribers = await Subscription.find({channel: channelId})

    return res
    .status(200)
    .json(
        new ApiResponse(200, subscribers, "Channel subscribers fetched successfully")
    )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    const subscribedChannels = await Subscription.find({subscriber: subscriberId});

    return res
    .status(200)
    .json(
        new ApiResponse(200, subscribedChannels, "Subscribed channels fetched successfully")
    )
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}