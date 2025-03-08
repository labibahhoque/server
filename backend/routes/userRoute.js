import express from "express";
import {
  registerUser,
  loginbySession,
  loginbyToken,
  updateProfile,
  viewStudentsByCourse,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";


const router = express.Router();


router.route("/register").post(singleUpload, registerUser);
router.route("/loginsession").post(loginbySession);
router.route("/logintoken").post(loginbyToken);
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile);
router.route("/view/students/course").get(isAuthenticated, viewStudentsByCourse);
//router.route("/logout").get(logoutUser);

export default router;
