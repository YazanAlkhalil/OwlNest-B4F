import React, { useEffect, useRef, useState } from 'react'
import image from '../assets/images/40npx.png'
import { IoIosNotifications } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { FaExchangeAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { toast } from 'react-hot-toast'


function NavBar({ highlight }) {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)
  const [roles, setRoles] = useState([])
  const overlayRef = useRef(null);
  const toggleOverlay = () => {
    setDropdown(!dropdown);
  };
  const handleClickOutside = (event) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const companyId = localStorage.getItem('companyId');

  useEffect(() => {
    async function getRole() {
      const res = await fetch(`http://localhost:5000/api/admin/company/${companyId}/role`, {
        credentials: 'include'
      })
      const data = await res.json();
      if (res.ok) {
        if (data.length === 0) {
          navigate('/trainee')
        }
        else if ((data.length === 1 && data.includes('admin'))) {
          navigate('/admin')
        }
        else
          setRoles(data)
      }
      else {
        toast.error(data.msg)
      }
    }
    getRole()
  }, [])
  return (
    <div className='flex justify-evenly items-center py-2 '>
      <div className='flex items-center flex-grow justify-evenly'>

        {
          roles.includes('trainer') && (
            <>
              <NavLink className={highlight == "trainee" ? "text-accent" : ""} to="/trainee">Trainee</NavLink>
              <NavLink className={highlight == "trainer" ? "text-accent" : ""} to="/trainer">Instructor</NavLink>
            </>
          )
        }
        {roles.includes('admin') && <NavLink className={highlight == "admin" ? "text-accent" : ""} to="/admin">Admin</NavLink>}
      </div>
      <div className='flex items-center flex-grow justify-end '>

        <IoIosNotifications className='size-8 hover:cursor-pointer' />
        <div className='relative flex items-center px-8'>
          <h3 className='pr-4'>username</h3>
          <img src={image} onClick={toggleOverlay} className='h-12 hover:cursor-pointer rounded-full'></img>
          <div ref={overlayRef} className={`${dropdown ? "block" : "hidden"} bg-white shadow-lg border-solid border border-slate-100 rounded w-48  absolute top-12 right-14`}>
            <div className='hover:bg-slate-200 px-4 py-2 hover:cursor-pointer rounded'><CiSettings className='inline size-5 mr-2' />settings</div>
            <div onClick={() => navigate('/company')} className='hover:bg-slate-200 px-4 py-2 hover:cursor-pointer rounded'><FaExchangeAlt className='inline size-5 mr-2' />change company</div>
            <div className='hover:bg-slate-200 px-4 py-2 hover:cursor-pointer rounded'><LuLogOut className='inline size-5 mr-2' />logout</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
