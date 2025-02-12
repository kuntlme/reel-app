import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENTIONS = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    transfromation?: {
        height: number,
        weith: number,
        quality?: number
    }
    createdAt?: Date;
    updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        title: {
            type: String,
            required: true
        }
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    controls: {
        type: Boolean,
        default: true
    },
    transfromation: {
        height: {
            type: Number,
            default: VIDEO_DIMENTIONS.height
        },
        weith: {
            type: Number,
            default: VIDEO_DIMENTIONS.width
        },
        quality: {
            type: Number,
            min: 1,
            max: 100
        }
    }
}, { timestamps: true })

const Video = models?.Video || model<IVideo>("Video", videoSchema)

export default Video;