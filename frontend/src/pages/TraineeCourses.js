import React, { useState , useEffect } from 'react'
import image from '../assets/images/multimedia-courses-scope-and-career 1.png'
import image2 from '../assets/images/BA-Courses 1.png'
import TraineeCourse from '../components/TraineeCourse'
import toast from 'react-hot-toast'




export default function TraineeCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
      const fetchCourses = async () => {
          try {
            const companyId = localStorage.getItem('companyId');
              const res = await fetch(`http://localhost:5000/api/trainee/${companyId}/courses`,{
                credentials : 'include'
              });
              const data = await res.json();
              console.log(data);
              if (!res.ok) {
                toast.error(data.msg)
              }else {
                setCourses(data);
              }
          } catch (error) {
              console.error('Fetch error:', error);
          }
      };

      fetchCourses();
  }, []);

  return (
      <div className="grid grid-cols-3 gap-x-24 gap-y-20">
          {courses.map(course => (
              <TraineeCourse key={course.id} {...course} />
          ))}
      </div>
  );
}
