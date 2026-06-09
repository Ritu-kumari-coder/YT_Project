import mongoose, {Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new mongoose.Schema({
    videoFile: {
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    },
    thumbnail: {
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

videoSchema.index({
    title: "text", 
    description: "text"
})

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);