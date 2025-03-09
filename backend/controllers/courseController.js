import {Course} from "../models/courseModel.js";
import {User} from "../models/userModel.js"; 

export const createCourse = async (req, res) => {
  try {
    const { title, description, syllabus } = req.body;

    
    const user = await User.findById(req.id);
    if (!user || user.role !== "Teacher") {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    const newCourse = new Course({
      title,
      description,
      syllabus,
      teachers: [user._id], 
      students: [], 
    });

    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ success: false, message: "Failed to create course", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    
    const { courseId, title, description, syllabus } = req.body;
    

    
    const user = await User.findById(req.id);
    

    if (!user || user.role !== "Teacher") {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    
    if (!course.teachers.includes(user._id)) {
      return res.status(403).json({ success: false, message: "You are not authorized to update this course" });
    }

    
    if (title) course.title = title;
    if (description) course.description = description;
    if (syllabus) course.syllabus = syllabus;
    

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ success: false, message: "Failed to update course", error: error.message });
  }
};
export const getEnrolledCourses = async (req, res) => {
  try {
    // Fetch the user by ID
    const user = await User.findById(req.id);

    
    if (!user || user.role !== "Student") {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    
    const enrolledCourses = await Course.find({ students: user._id }).select("title description syllabus teachers").populate({
      path: "teachers", 
      select: "fullname email", 
    });

    
    if (enrolledCourses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No enrolled courses found",
        courses: [],
      });
    }

    
    res.status(200).json({
      success: true,
      message: "Enrolled courses fetched successfully",
      courses: enrolledCourses,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);

   
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
      error: error.message,
    });
  }
};
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().select("title description syllabus teachers").populate({
      path: "teachers",
      select: "fullname email",
    });

    
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error("Error fetching all courses:", error);

    
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};
export const enrollInCourses = async (req, res) => {
  try {
    const { courseIds } = req.body;
    const user = await User.findById(req.id);

    if (!user || user.role !== "Student") {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

   
    if (!user.enrolledCourses) {
      user.enrolledCourses = [];
    }

    const courses = await Course.find({ _id: { $in: courseIds } });

    for (const course of courses) {
      
      if (!course.students) {
        course.students = [];
      }

      if (!course.students.includes(user._id)) {
        course.students.push(user._id);
        user.enrolledCourses.push(course._id);
        await course.save();
      }
    }

    await user.save();

    res.status(200).json({ success: true, message: "Enrolled successfully!" });
  } catch (error) {
    console.error("Error enrolling in courses:", error);
    res.status(500).json({ success: false, message: "Failed to enroll", error: error.message });
  }
};

