import React from 'react'
import'./card.css'

function Card(props) {
  return (
    <div className='divCard'>
        <p>
            {props.number}
        </p>
        <p>
        {props.string}
        </p>
    </div>
  )
}

export default Card
