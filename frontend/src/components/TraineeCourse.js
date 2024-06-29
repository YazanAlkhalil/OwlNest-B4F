import ProgressBar from '@ramonak/react-progress-bar';
import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function TraineeCourse(props) {
    const navigate = useNavigate();
    const handleClickCourse = () => {
      navigate('id');
    }
  return (
    <div
        className="hover:cursor-pointer"
        key={props.id}>
        <img className="w-full border  rounded" src={props.image} onClick={() => { navigate("/trainee/courses/id"); }} />
        <ProgressBar
          completed={props.progress}
          labelColor="#FFFFFF"
          bgColor="#001f34"
          transitionDuration="0.8s"
          transitionTimingFunction="ease-out"
          animateOnRender
          className="mt-3"
        />
        <div className="text-xl font-semibold w-[330px] mt-2 py-1 px-2">
          {props.title}
        </div>
      </div>
  )
}
