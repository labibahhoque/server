import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import session from "express-session";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { Course } from "../models/courseModel.js";

export const registerUser = async (req, res) => {
  const { fullname, email, password, role } = req.body;

  if (!fullname || !email || !password || !role) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    let profilePhoto = null;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhoto = cloudResponse.secure_url;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhoto || "default_profile_url",
      },
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user." });
  }
};


export const loginbySession = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(403).json({
        message: "Access denied for this role.",
        success: false,
      });
    }

    req.session.user = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    };


    return res.status(200).json({
      message: `Welcome back, ${user.fullname}`,
      user: req.session.user,
      success: true,
    });
  } catch (error) {
    console.error("Error in loginbySession:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};


export const loginbyToken = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, bio, CGPA, enrolledCourses } = req.body;
    const file = req.file;

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (bio) user.profile.bio = bio;
    if (CGPA) user.profile.CGPA = parseFloat(CGPA);

    
    if (enrolledCourses && Array.isArray(enrolledCourses)) {
      user.profile.EnrolledCourses = enrolledCourses;

      
      for (const courseId of enrolledCourses) {
        await Course.findByIdAndUpdate(
          courseId,
          { $addToSet: { students: userId } }, 
          { new: true }
        );
      }
    }

    
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.profilePhoto = cloudResponse.secure_url;
    }

    await user.save();

    
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Failed to update profile.",
      error: error.message,
      success: false,
    });
  }
};

export const viewStudentsByCourse = async (req, res) => {
  try {
    const teacherId = req.id;

    
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "Teacher") {
      return res.status(403).json({
        message: "Unauthorized access. Only teachers can view students by course.",
        success: false,
      });
    }

    
    const courses = await Course.find({ teachers: teacherId })
      .populate("students", "fullname email") 
      .select("title students"); 

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        message: "No courses found for this teacher.",
        success: false,
      });
    }

    
    const courseStudents = courses.map((course) => ({
      courseId: course._id,
      courseTitle: course.title,
      students: course.students,
    }));

    return res.status(200).json({
      message: "Students retrieved successfully.",
      courses: courseStudents,
      success: true,
    });
  } catch (error) {
    console.error("Error retrieving students by course:", error);
    return res.status(500).json({
      message: "Failed to retrieve students by course.",
      error: error.message,
      success: false,
    });
  }
};


