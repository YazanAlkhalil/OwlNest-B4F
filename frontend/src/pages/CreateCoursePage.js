import React from 'react'
import NavButton from '../components/NavButton'
import CourseEdit from '../components/CourseEdit'
import CourseReports from '../components/CourseReports'
import CourseTrainees from '../components/CourseTrainees'
import {useState} from 'react'

function CreateCoursePage() {
  const [content,setContent] = useState('edit')
  
  return (
    <>
    <div className='flex gap-6'>
      <NavButton name={'edit'} highlight={content == 'edit'} handleClick={()=> setContent('edit')}/>
      <NavButton name={'reports'} highlight={content == 'reports'} handleClick={()=> setContent('reports')}/>
      <NavButton name={'trainees'} highlight={content == 'trainees'} handleClick={()=> setContent('trainees')}/>
    </div>
    <div className='pt-10'>
      {content === "edit" && <CourseEdit />}
      {content === "reports" && <CourseReports />}
      {content === "trainees" && <CourseTrainees />}
    </div>
    </>
    
  )
}

export default CreateCoursePage
