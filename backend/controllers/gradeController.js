import { Grade } from "../models/gradesModel.js";

export const addGrades = async (req, res) => {
    try {
        const { studentId, courseId, assessments } = req.body;

        const grade = new Grade({
            student: studentId,
            course: courseId,
            assessments,
        });

        await grade.save();
        res.status(201).json({ message: "Grades added successfully", grade });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const calculateGPA = async (req, res) => {
    try {
        const { gradeId } = req.body;

        const grade = await Grade.findById(gradeId);

        if (!grade) {
            return res.status(404).json({ message: "Grade record not found" });
        }

        let totalPoints = 0;
        let totalMaxGrade = 0;

        grade.assessments.forEach((assessment) => {
            totalPoints += assessment.grade;
            totalMaxGrade += assessment.maxGrade;
        });

        const GPA = ((totalPoints / totalMaxGrade) * 4).toFixed(2); // Assuming GPA is out of 4
        grade.GPA = GPA;

        await grade.save();
        res.status(200).json({ message: "GPA calculated successfully", GPA });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getStudentGrades = async (req, res) => {
    try {
        const { studentId } = req.params;

        const grades = await Grade.find({ student: studentId }).populate("course");

        res.status(200).json({ grades });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
