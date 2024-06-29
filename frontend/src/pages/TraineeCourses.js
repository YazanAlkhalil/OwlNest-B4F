import React from 'react'
import image from '../assets/images/multimedia-courses-scope-and-career 1.png'
import image2 from '../assets/images/BA-Courses 1.png'
import TraineeCourse from '../components/TraineeCourse'


const courses = [
  {
    id: 1,
    image: image,
    title: "Data Structures from C to Python",
    progress: 23
  },
  {
    id: 2,
    image: image,
    title: "Data Structures from C to Python",
    progress: 65

  },
  {
    id: 3,
    image: image2,
    title: "Multimedia",
    progress: 95
  },
  {
    id: 4,
    image: image2,
    title: "Multimedia",
    progress: 100
  },
  {
    id: 5,
    image: image2,
    title: "Multimedia",
    progress: 0
  },
];


export default function TraineeCourses(props) {
  return (
    <>
    <div className="grid grid-cols-3 gap-x-24 gap-y-20 ">
      {
        courses.map(course => (
          <TraineeCourse {...course}/>
        ))
      }
    </div>

    </>
  )
}
