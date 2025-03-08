import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CoursesTable = () => {
    const { courses,searchCoursesByText } = useSelector(store => store.course);
    const [filterCourses,setFilterCourses]=useState(courses);
    const navigate=useNavigate();
    useEffect(()=>{
        const filteredCourse=courses.length>=0 && courses.filter((course)=>{
            if(!searchCoursesByText){
                return true;
            };
            return course?.name?.toLowerCase().includes(searchCoursesByText.toLowerCase());
        });
        setFilterCourses(filteredCourse);
    },[courses,searchCoursesByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered courses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Syllabus</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCourses?.map((course) => (

                            <tr key={course._id}>
                                <TableCell>{course?.name}</TableCell>
                                <TableCell>{course?.syllabus}</TableCell>
                            </tr>


                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CoursesTable