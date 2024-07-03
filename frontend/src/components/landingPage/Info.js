import React from 'react'
import'./info.css'

function info(props) {
  return (
    <div>
      <></>  
      <div className='learn'>
        <b>{props.string1}</b>
      </div>
      <div>
        <p className='take'>{props.string2}</p>
      </div>
    </div>
  )
}

export default info
