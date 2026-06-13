import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    const playlist = await Playlist.create({
        name, 
        description,
        owner: new mongoose.Types.ObjectId(req.user._id)
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "Playlist created successfully")
    )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    
    const playlists = await Playlist.find({owner: userId})

    return res
    .status(200)
    .json(200, playlists, "User playlists fetched successfully")
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    
    const playlist = await Playlist.findById(playlistId)

    return res
    .status(200)
    .json(200, playlist, "Playlist fetched successfully")
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push: {
                videos: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            returnDocument: "after"
        }
    )

    return res
    .status(200)
    .json(200, playlist, "Video successfully added to playlist")
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                videos: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            returnDocument: "after"
        }
    )

    return res
    .status(200)
    .json(200, playlist, "Video successfully removed from the playlist")

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    
    await Playlist.findByIdAndDelete(playlistId)

    return res
    .status(200)
    .json(200, {}, "Playlist deleted successfully")
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body

    if(!name || !description){
        throw new ApiError(400, "name and description both are required")
    }
    
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set: {
                name: name,
                description: description
            }
        },
        {
            returnDocument: "after"
        }
    )

    return res
    .status(200)
    .json(200, playlist, "Playlist updated successfully")
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}