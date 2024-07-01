import TrainerCourse from "../components/TrainerCourse"
import image from '../assets/images/multimedia-courses-scope-and-career 1.png'
import image2 from '../assets/images/BA-Courses 1.png'
import image3 from '../assets/images/c_7_free_google_courses_become_machine_learning_engineer_1 1.png'
import image4 from '../assets/images/course__cs101_courses_datastructuresfromctopython__course-promo-image-1653540139 1.png'
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function TrainerCoursesPage() {

  const [courses,setCourses] = useState([])
  const companyId = localStorage.getItem('companyId')
  useEffect(()=>{
    const getCompanies = async () => {
      const res = await fetch(`http://localhost:5000/api/trainer/courses/${companyId}`,{
        credentials:'include'
      })
      const data = await res.json()
      if(!res.ok){
        toast.error(data.msg)
      }
      else{
        setCourses(data)
      }
    }
    getCompanies()
  },[])


  return (
    <div className="grid grid-cols-3 gap-y-12 ">

      {courses.map(course => (
        <TrainerCourse key={course._id} id={course._id} image={course.image && course.image} name={course.courseName}/>
      ))}
    </div>
    
  )
}

export default TrainerCoursesPage
