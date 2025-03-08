import mongoose from "mongoose";
import { Attendance } from "../models/attendanceModel.js";
import { Course } from "../models/courseModel.js";

export const markAttendance = async (req, res) => {
    try {
        const { studentIds, courseId, date, status } = req.body;

        
        if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
            return res.status(400).json({ message: "Student IDs are required" });
        }

        
        const records = studentIds.map((studentId) => ({
            student: studentId,
            course: courseId,
            date: date || new Date(),
            status,
        }));

        await Attendance.insertMany(records);
        res.status(201).json({ message: "Attendance marked successfully", records });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getStudentAttendance = async (req, res) => {
    try {
        const { studentId } = req.params;

        const attendanceRecords = await Attendance.find({ student: studentId }).populate("course");
        res.status(200).json({ attendance: attendanceRecords });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const generateAttendanceReport = async (req, res) => {
    try {
        const { courseId, studentId, startDate, endDate } = req.body;
        const loggedInTeacherId = req.id;

        if (!courseId || !studentId) {
            return res.status(400).json({ message: "Course ID and Student ID are required." });
        }

        const course = await Course.findOne({
            _id: courseId,
            teachers: { $in: [loggedInTeacherId] } 
        });

        

        const query = { course: courseId, student: studentId };

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const attendanceRecords = await Attendance.find(query)
            .populate("student", "fullname email profile")
            .populate("course", "title description")
            .sort({ date: 1 });

        if (attendanceRecords.length === 0) {
            return res.status(404).json({ message: "No attendance records found." });
        }

        const totalDays = attendanceRecords.length;
        const presentDays = attendanceRecords.filter((record) => record.status === "Present").length;
        const attendancePercentage = ((presentDays / totalDays) * 100).toFixed(2);

        res.status(200).json({
            report: attendanceRecords,
            totalDays,
            presentDays,
            attendancePercentage: `${attendancePercentage}%`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



