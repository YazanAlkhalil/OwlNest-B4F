import ProgressBar from '@ramonak/react-progress-bar';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import imagePlaceholder from '../assets/images/multimedia-courses-scope-and-career 1.png';


const TraineeCourse = ({ id, image, progress, title }) => {
  const navigate = useNavigate();

  const handleClickCourse = () => {
      navigate(`/trainee/courses/${id}`);
  }

  return (
      <div className="hover:cursor-pointer" onClick={handleClickCourse}>
          <img className="w-full border rounded" src={image || imagePlaceholder} alt={title} />
          <ProgressBar
              completed={progress}
              labelColor="#FFFFFF"
              bgColor="#001f34"
              transitionDuration="0.8s"
              transitionTimingFunction="ease-out"
              animateOnRender
              className="mt-3"
          />
          <div className="text-xl font-semibold w-[330px] mt-2 py-1 px-2">
              {title}
          </div>
      </div>
  );
}

export default TraineeCourse;
