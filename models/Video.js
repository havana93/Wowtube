import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl:{
        type: String,
        required: "File URL is required"
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0   //처음 비디오가 생성됬을때의 조회수값 
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
 ]
});

const model = mongoose.model("Video", VideoSchema);
export default model;