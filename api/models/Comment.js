import mongoose from "mongoose";

const Comment = mongoose.model('Comment', new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String },
    body: { type: String, required: true },
    postedAt: { type: Date, required: true },
}));

export default Comment;