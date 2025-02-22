import React from 'react'

function PriceCard(props) {
  return (
    <div className='h-64 w-full flex flex-col justify-center items-center bg-custom-black-body rounded-md shadow-black shadow-md lg:hover:scale-105 gap-2 duration-300 cursor-pointer p-3'>
        <img src={props.img} alt="" className=''/>
        <h1 className='text-white text-xl font-semibold text-center '>{props.name}</h1>
        {
          parseFloat(props.rprice)===parseFloat(props.price)?(
             <div className='flex gap-1 text-white font-semibold'><h1>$</h1>
            <h1 className='text-white font-semibold text-xl'>{props.rprice}</h1></div>
          ):(
           <div className='flex gap-2 text-white font-semibold'>
            <h1 className='font-semibold'>$</h1>
            <h1 className='line-through'>{props.rprice}</h1>
            <h1 className='text-xl'>{props.price}</h1>
           </div>
          )
        }
    </div>
  )
}

export default PriceCard
