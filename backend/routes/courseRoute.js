import express from "express";
import {
  createCourse,
  enrollInCourses,
  getAllCourses,
  getEnrolledCourses,
  updateCourse,
} from "../controllers/courseController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.route("/create").post(isAuthenticated, createCourse);
router.route("/update").post(isAuthenticated,updateCourse);
router.route("/getcourses").get(isAuthenticated,getEnrolledCourses);
router.route("/courses").get(isAuthenticated,getAllCourses);
router.route("/enroll").post(isAuthenticated,enrollInCourses);
export default router;
