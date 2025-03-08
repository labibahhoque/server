import express from "express";
import { addGrades, calculateGPA, getStudentGrades } from "../controllers/gradeController.js";

const router = express.Router();


router.post("/add", addGrades);


router.post("/calculate-gpa", calculateGPA);

router.get("/:studentId", getStudentGrades);


export default router;
