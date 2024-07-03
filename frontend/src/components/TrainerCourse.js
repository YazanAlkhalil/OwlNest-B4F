import React from 'react'
import def from '../assets/images/default-course-thumbnail.png'

function TrainerCourse({name,image,id,onClick}) {

  return (
    <div onClick={onClick} className='hover:cursor-pointer'>
      <img className='w-4/5 rounded' src={image ? image : def}/>
      <div className='text-xl bg-primary text-white w-4/5 mt-2 py-1 px-2 rounded'>{name}</div>
    </div>
  )
}

export default TrainerCourse
