import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  syllabus: {
    type: String, 
    trim: true,
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
  ],
  materials: [
    {
      title: { type: String, required: true },
      fileUrl: { type: String, required: true }, 
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
},{ timestamps: true }
);


export const Course = mongoose.model("Course", courseSchema);
