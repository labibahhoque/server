import { Assignment } from "../models/assignmentModel.js";
import { Comment } from "../models/commentModel.js";
import { User } from "../models/userModel.js";

export const createAssignment = async (req, res) => {
    try {
        const { title, description, dueDate, course } = req.body;

        const user = await User.findById(req.id);
        if (!user || user.role !== "Teacher") {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }
        const teacherId = user._id;


        if (!title || !description || !dueDate || !course) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }


        const newAssignment = new Assignment({
            title,
            description,
            dueDate,
            course,
            postedBy: teacherId
        });


        await newAssignment.save();

        res.status(201).json({
            success: true,
            message: "Assignment created successfully",
            assignment: newAssignment
        });
    } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const addComment = async (req, res) => {
    try {
        const { text, assignmentId } = req.body;
        const user = await User.findById(req.id); 

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found." });
        }

        const newComment = new Comment({
            commentor: user._id,
            text
        });

        await newComment.save();

        assignment.comments.push(newComment._id);
        await assignment.save();

        res.status(201).json({ message: "Comment added successfully.", comment: newComment });

    } catch (error) {
        res.status(500).json({ message: "Error adding comment.", error: error.message });
    }
};
export const replyToComment = async (req, res) => {
    try {
        const { text, commentId } = req.body;
        const user = await User.findById(req.id); 

        const parentComment = await Comment.findById(commentId);
        if (!parentComment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        const newReply = new Comment({
            commentor: user._id,
            text
        });

        await newReply.save();

        parentComment.replies.push(newReply._id);
        await parentComment.save();

        res.status(201).json({ message: "Reply added successfully.", reply: newReply });

    } catch (error) {
        res.status(500).json({ message: "Error replying to comment.", error: error.message });
    }
};
