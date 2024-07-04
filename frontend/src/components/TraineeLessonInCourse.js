import React from 'react'
import { useNavigate } from "react-router-dom";
import { FaPlay, FaRegFilePdf } from "react-icons/fa";
import { PiExam } from "react-icons/pi";


function TraineeLessonInCourse(lesson) {
    const navigate = useNavigate();
    function getIcon(icon) {
        if (icon === "video") return <FaPlay />;
        else if (icon === "pdf") return <FaRegFilePdf />;
        else return <PiExam />;
      }
      const displayLesson = async ()=>{
        navigate(lesson.lesson.type)
        localStorage.setItem('lessonId',lesson.lesson._id)
      }
  return (
    <div onClick={displayLesson}>
      
          <div
            key={lesson.lesson._id}
            className="bg-gray-50 hover:cursor-pointer hover:bg-gray-200 text-black border flex justify-between items-center mb-2 p-2 py-3 rounded"
            onClick={()=> navigate('/trainee/courses/:id/content/lesson')}
            >
            <h1 className="text-md font-bold">{lesson.lesson.title}</h1>
            <div className="text-xl pt-1">{getIcon(lesson.lesson.type)}</div>
          </div>
    </div>
  )
}

export default TraineeLessonInCourse
