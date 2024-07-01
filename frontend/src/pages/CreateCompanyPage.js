import { useState } from 'react'
import image from '../assets/images/—Pngtree—e-learning education online illustration_6548963.png'
import logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'




function CreateCompanyPage() {
    const navigate = useNavigate()

    return (
        <div className='grid grid-cols-2'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl mb-16'>Welcome to OwlNest!!!!! </h1>
                <div className='py-4 px-12 bg-slate-100 rounded flex shadow-lg flex-col items-center gap-6'>
                    <p>Do you have a company and what to create courses?</p>
                    <img src={logo} className='w-20'/>
                    <div className='flex w-full justify-evenly my-6'>
                        <button onClick={()=>{navigate('/registerCompany')}} className='p-2 rounded bg-accent hover:bg-[#dea11ecd] text-white'>Create your nest now</button>
                        <button onClick={()=>{navigate('/company')}} className='p-2 rounded bg-secondary hover:bg-[#3f6188d0] text-white'>maybe later</button>
                    </div>
                </div>
            </div>
            <div className='test flex flex-col items-center justify-center h-screen'>
                <img className='w-3/4' src={image} />
            </div>
        </div>
    )
}

export default CreateCompanyPage
