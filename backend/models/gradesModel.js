import mongoose from "mongoose";

const gradesSchema = new mongoose.Schema(
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      assessments: [
        {
          type: {
            type: String,
            enum: ["Assignment", "Quiz", "Exam", "Other"],
            required: true,
          },
          grade: {
            type: Number,
            required: true,
          },
          maxGrade: {
            type: Number,
            required: true,
          },
        },
      ],
      GPA: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  );
  
  export const Grade = mongoose.model("Grade", gradesSchema);
  