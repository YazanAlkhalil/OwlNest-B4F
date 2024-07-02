import React, { useEffect, useState } from 'react'
import Company from '../components/Company'
import Navbar2 from '../components/Navbar2'
import image from '../assets/images/logo.png'
import image1 from '../assets/images/facebook.png'
import image2 from '../assets/images/syriatel.png'
import toast from 'react-hot-toast'

export default function CompanyPage() {
  const [companies, setCompanies] = useState([])

  useEffect( () => {
     const getCompanies = async () => {
      const res = await fetch('http://localhost:5000/api/admin/companies', {
        credentials: "include"
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(res.msg)
      }
      else {
        setCompanies(data)
      }
    }
    getCompanies()
  }, [])

  return (
    <>
      <Navbar2 />
      <div className="container mx-auto">
        <h1 className='font-black text-2xl p-8'>Companies</h1>
        <div className='grid grid-cols-3 gap-x-20 gap-12 px-20 pb-4'>
          {
            companies.map(company => (
              <Company key={company._id} id={company._id} image={company.logo} />
            ))
          }
        </div>
      </div>
    </>
  )
}
