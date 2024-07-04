import React from 'react'
import NavLanding from '../components/landingPage/NavLanding'
import img from '../assets/images/top_v7.jpg'
import Contain from '../components/landingPage/Contain'
import'./LandingPage.css'
import Courses from '../components/landingPage/Courses'
import img2 from'../assets/images/istockphoto-1992829733-170667a.webp'
import Teacher from '../components/landingPage/Teacher'
import Event from '../components/landingPage/Event'
import File from '../components/landingPage/File'
import Info from '../components/landingPage/Info'
import Inc from '../components/landingPage/Inc'

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
        <div className='three'>
           <img className='teacher' src={img2}/>
           <Teacher/>
        </div>
        <div className='four'>
         <Event/>   
         <File/>
         <div className='divInfo'>
          <Info string1={"Teach anything"} string2={"Take any interesting or popular topic, establish the basic requirements and develop the skills of others"}/>
          <Info string1={"Save time and money"} string2={"Spend less time and money on your education with a ready-made application that meets your needs"}/>
          <Info string1={"Granting certificates"} string2={"You can award a certificate for any training course you offer"}/>
         </div>
        </div>
        <div className='footer'>
          <Inc/>
        </div>
    </div>
  )
}

export default LandingPage
