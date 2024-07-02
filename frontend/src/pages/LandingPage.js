import React from 'react'
import NavLanding from '../components/landingPage/NavLanding'
import img from '../assets/images/top_v7.jpg'
import Contain from '../components/landingPage/Contain'
import'./LandingPage.css'
import Courses from '../components/landingPage/Courses'
import img2 from'../assets/images/istockphoto-1992829733-170667a.webp'

function LandingPage() {
  return (
    <div>
        <div>
         <NavLanding/>
        </div>
        <div className='one'>
          <Contain/>  
          <img className='girl' src={img}/>
        </div>
        <div>
           <Courses/>
        </div>
        <div>
           <img className='teacher' src={img2}/>
        </div>
    </div>
  )
}

export default LandingPage
