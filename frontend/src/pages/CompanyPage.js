import React from 'react'
import Company from '../components/Company'
import Navbar2 from '../components/Navbar2'
import image from '../assets/images/logo.png'
import image1 from '../assets/images/facebook.png'
import image2 from '../assets/images/syriatel.png'

export default function CompanyPage() {
  
  return (
    <>
    <Navbar2 />
    <div className="container mx-auto">
        <h1 className='font-black text-2xl p-8'>Companies</h1>
        <div className='grid grid-cols-3 gap-x-20 gap-12 px-20 pb-4'>
        <Company image={image}/>
        <Company image={image1}/>
        <Company image={image2}/>
        <Company image={image}/>
        <Company image={image1}/>
        <Company image={image2}/>
        <Company image={image}/>
        <Company image={image1}/>
        <Company image={image2}/>
        
        </div>
    </div>
    </>
  )
}
