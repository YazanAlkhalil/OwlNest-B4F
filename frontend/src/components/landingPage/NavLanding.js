import React from 'react'
import'./navLanding.css'
import img from '../../assets/images/logo.png'

function NavLanding() {
  return (
    <div className='divNav'>
      <div>
        <img className='imgNav' src={img}/>
      </div>
      <div>
         <b className='logoNav'>OwlNest</b>
      </div>
      <div className='divSearch'>
         <p className='search'>search</p>
      </div>
      <div>
        <button className='login'>log in</button>
        <button className='register'>register</button>
      </div>
    </div>
  )
}

export default NavLanding
