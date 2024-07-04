import React, { useEffect, useState } from 'react'
import image from '../assets/images/multimedia-courses-scope-and-career 1.png'
import image2 from '../assets/images/BA-Courses 1.png'
import TraineeCourse from '../components/TraineeCourse'
import toast from 'react-hot-toast'







export default function TraineeCourses(props) {
  const [courses,setCourses] = useState([])
  const companyId = localStorage.getItem('companyId')

  async function getCourses(){
    const res = await fetch(`http://localhost:5000/api/trainee/${companyId}/courses`,
      {
        credentials:'include'
      }
    )
    const data = await res.json()
    if(!res.ok)
      toast.error(data.msg)
    else{
      setCourses(data)
    }
  }
  useEffect(()=>{
    getCourses()
  }
    ,
    []
  )
    
  
  return (
      <div className="grid grid-cols-3 gap-x-24 gap-y-20">
          {courses.map(course => (
              <TraineeCourse key={course.id} {...course} />
          ))}
      </div>
  );
}
