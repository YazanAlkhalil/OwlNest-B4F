import TrainerCourse from "../components/TrainerCourse"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function TrainerCoursesPage() {
  const navigate = useNavigate()

  const [courses,setCourses] = useState([])
  const companyId = localStorage.getItem('companyId')
  async function handleClick(id){
    navigate(id)
  }
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
        <TrainerCourse  handleClick={handleClick} key={course._id} id={course._id} image={course.image && course.image} name={course.courseName}/>
      ))}
    </div>
    
  )
}

export default TrainerCoursesPage
