import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
export const Comment = mongoose.model("Comment", commentSchema);
