import express from "express";
import { markAttendance, getStudentAttendance, generateAttendanceReport } from "../controllers/attendanceController.js";


const router = express.Router();



router.post("/mark", markAttendance);

router.get("/report", generateAttendanceReport);


router.get("/:studentId", getStudentAttendance);

export default router;
