import React, { useState } from 'react'

function Card(props) {
    let[hover,sethover]=useState(false)
  return (
    <div className={' h-64 w-full flex flex-col gap-2 justify-center items-center text-center cursor-pointer overflow-hidden rounded-md'} onMouseEnter={()=>sethover(true)} onMouseLeave={()=>sethover(false)} onClick={props.onClick}>
        <div className={'overflow-hidden h-full w-full relative flex justify-center items-center '}>
        <h1 className={`${hover?"scale-100":" scale-0"} duration-300 absolute text-white font-semibold backdrop-blur-sm py-20 px-10 rounded-md transition-all hidden lg:block`}>Check it out</h1>
      <img src={props.image} alt="" className='overflow-hidden h-full w-full' />
      </div>
      <h1 className='text-white font-semibold'>{props.title}</h1>
    </div>
  )
}

export default Card
