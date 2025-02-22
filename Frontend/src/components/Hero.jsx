import React, { useEffect, useState } from 'react'
import { useGames } from '../context/GamesContext'
import hero from "../images/hero.jpg"

function Hero(props) {
    let games=useGames();
    
    
    
  return (
    <div className='w-full  h-[26rem] bg-center bg-no-repeat bg-cover rounded-md flex justify-center items-center py-7 px-5' style={{backgroundImage:`url(${hero})`}}>
      <div className='backdrop-blur-sm w-full h-full flex justify-center items-center flex-col text-white gap-2'>
        <h1 className='text-3xl font-semibold'>GAMESCOUT</h1>
        <h1 className='text-xl font-semibold text-center'>Everything You Need To Know</h1>
        <button className='py-3 px-8 bg-gray-800 rounded-md mt-2 active:bg-gray-900 cursor-pointer'onClick={props.onClick}>Explore</button>
      </div>
    </div>
  )
}
export default Hero
