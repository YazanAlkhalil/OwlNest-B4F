import React from 'react'

function Button({name,onClick}) {
  return (
    <button className='p-2 rounded-xl bg-primary text-white hover:cursor-pointer hover:bg-hover w-4/5' onClick={onClick}>
        {name}
    </button>
  )
}

export default Button
