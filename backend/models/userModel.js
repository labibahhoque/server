import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Teacher","Student"],
      required: true,
    },
    profile: {
      bio: { type: String },
      profilePhoto: {
        type: String,
        default: "",
      },
      CGPA: { type: Number },
      EnrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
