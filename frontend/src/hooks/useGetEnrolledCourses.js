import { setEnrolledCourses } from "@/redux/courseSlice"; // Assuming you have a slice for courses
import { COURSE_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetEnrolledCourses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get(`${COURSE_API_END_POINT}/getCourses`, { withCredentials: true });
        console.log("API Response:", res.data);
        if (res.data.success) {
          dispatch(setEnrolledCourses(res.data.courses));
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, [dispatch]);
};

export default useGetEnrolledCourses;
