import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import useGetAllCourses from "@/hooks/useGetAllCourses";
import axios from "axios";
import { COURSE_API_END_POINT } from "@/utils/constant";

const EnrollmentDialog = ({ open, setOpen }) => {
    useGetAllCourses();

    const { allCourses } = useSelector((store) => store.course);
    const { user } = useSelector((store) => store.auth);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

 
    const enrolledCourses = user?.enrolledCourses || [];

    const handleCourseSelection = (courseId) => {
        setSelectedCourses((prevSelected) =>
            prevSelected.includes(courseId)
                ? prevSelected.filter((id) => id !== courseId)
                : [...prevSelected, courseId]
        );
    };

    const handleEnroll = async () => {
        try {
            const alreadyEnrolled = selectedCourses.filter((courseId) =>
                enrolledCourses.includes(courseId)
            );

            if (alreadyEnrolled.length > 0) {
                setErrorMessage("You are already enrolled in one or more selected courses.");
                return;
            }

            await axios.post(
                `${COURSE_API_END_POINT}/enroll`,
                { courseIds: selectedCourses },
                { withCredentials: true }
            );

            setOpen(false);
            console.log("Enrolled successfully!");
        } catch (error) {
            console.error("Error enrolling in courses:", error);
            setErrorMessage("Failed to enroll in courses. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent aria-describedby="dialog-description">
                <DialogHeader>
                    <DialogTitle>Enroll in New Courses</DialogTitle>
                </DialogHeader>
                <p id="dialog-description">
                    Select a course to enroll. If you are already enrolled, you will see a message.
                </p>
                <div>
                    <ul>
                        {allCourses?.length > 0 ? (
                            allCourses.map((course) => (
                                <li key={course._id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={course._id}
                                        checked={selectedCourses.includes(course._id)}
                                        onChange={() => handleCourseSelection(course._id)}
                                    />
                                    <label htmlFor={course._id}>{course.title}</label>
                                </li>
                            ))
                        ) : (
                            <p>No courses available</p>
                        )}
                    </ul>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEnroll}>
                        Enroll
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EnrollmentDialog;
