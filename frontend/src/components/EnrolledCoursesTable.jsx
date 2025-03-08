import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { Button } from './ui/button'
import EnrollmentDialog from './EnrollmentDialog'


const EnrolledCoursesTable = () => {
    const course = useSelector(store => store.course)
    const [showEnrollmentDialog, setShowEnrollmentDialog] = useState(false);
    
      const handleEnrollNewCourse = () => {
        setShowEnrollmentDialog(true);
      };
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Syllabus</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        course?.enrolledCourses?.length <= 0 ? <span>You haven't enrolled in any course yet</span> : course.enrolledCourses.map((encourse) => (
                            <TableRow key={encourse._id}>
                                <TableCell>{encourse?.title}</TableCell>
                                <TableCell>{encourse?.description}</TableCell>
                                <TableCell>{encourse?.syllabus}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div className="flex justify-end my-5">
                <Button variant="primary" onClick={handleEnrollNewCourse}>
                    Enroll in New Courses
                </Button>
            </div>
            {showEnrollmentDialog && (
           <EnrollmentDialog open={showEnrollmentDialog} setOpen={setShowEnrollmentDialog} />
        )}
        </div>
    )
}

export default EnrolledCoursesTable