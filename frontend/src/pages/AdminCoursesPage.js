import React, { useEffect, useState } from 'react';
import TrainerCourse from '../components/TrainerCourse';
import FormDialog from '../components/admin/AddCourseDialog';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()
    let companyId = localStorage.getItem('companyId')
    const getCourses = async () => {
        const res = await fetch(`http://localhost:5000/api/admin/courses/${companyId}`, {
            credentials : 'include'
        });
        const data = await res.json();
        if (!res.ok) {
            toast.error(data.msg);
        } else {
            setCourses(data);
        }
    };
    useEffect(() => {

        getCourses();
    }, []);

    return (
        <div className='flex flex-col'>
            <FormDialog onAddUserToCourse = {getCourses}/>
            <div className='grid grid-cols-3 gap-y-10'>
                {courses.map(course => (
                    <TrainerCourse onClick = {() => {navigate(course._id)}} key={course._id} image={course.image} name={course.courseName} />
                ))}
            </div>
        </div>
    );
}

export default AdminCoursesPage;
