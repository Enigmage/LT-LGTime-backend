import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    img: {
        type:String, 
    },
    latitude: {
        type: Number,
        require: true,
    },
    longitude: {
        type: Number,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
});

export const PostModel = mongoose.model("posts", PostSchema);
