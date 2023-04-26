import mongoose from "mongoose";

const Vote = mongoose.model('Vote', new mongoose.Schema({
    author: { type: String, required: true, },
    commentId: { type: mongoose.ObjectId, required: false, },
    direction: {type:Number, required: true, },
}));

export default Vote;