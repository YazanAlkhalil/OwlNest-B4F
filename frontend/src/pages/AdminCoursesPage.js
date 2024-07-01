import React, { useEffect, useState } from 'react';
import TrainerCourse from '../components/TrainerCourse';
import FormDialog from '../components/admin/AddCourseDialog';
import toast from 'react-hot-toast';

function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    let companyId = localStorage.getItem('companyId')
    useEffect(() => {
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

        getCourses();
    }, []);

    return (
        <div className='flex flex-col'>
            <FormDialog />
            <div className='grid grid-cols-3 gap-y-10'>
                {courses.map(course => (
                    <TrainerCourse key={course._id} image={course.image} name={course.courseName} />
                ))}
            </div>
        </div>
    );
}

export default AdminCoursesPage;
