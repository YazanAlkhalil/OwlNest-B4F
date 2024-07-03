import ProgressBar from '@ramonak/react-progress-bar';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import def from '../assets/images/default-course-thumbnail.png'


function TraineeCourse(props) {
    const navigate = useNavigate();
    const handleClickCourse = () => {
      navigate(`${props.id}/content`);
    }
  return (
    <div
    onClick={handleClickCourse}
        className="hover:cursor-pointer"
        key={props.id}>
        <img className="w-full border  rounded" src={props.image ? props.image : def} onClick={() => { navigate("/trainee/courses/id"); }} />
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
          {props.courseName}
        </div>
      </div>
  );
}

export default TraineeCourse;
