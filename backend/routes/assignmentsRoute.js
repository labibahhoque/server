import express from "express";
import { createAssignment,addComment, replyToComment } from "../controllers/assignmentController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();


router.route("/create").post( isAuthenticated, createAssignment);
router.route("/comment/add").post(isAuthenticated, addComment);
router.route("/comment/reply").post(isAuthenticated, replyToComment);

export default router;
