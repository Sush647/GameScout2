import React, { useEffect, useState } from 'react'
import { useGames } from '../context/GamesContext'

function Platform() {
    const game=useGames()
    let[platform,setplatform]=useState();

    useEffect(()=>{
        game.singlegame&&setplatform(game.singlegame?.results?.platforms);
    },[game.singlegame])

    
  return (
    <div className='flex flex-wrap gap-2  w-max-96 w-fit '>
      {
        platform&&platform.map((p)=>(
            <div className='px-4 py-3 font-semibold text-white bg-custom-black-body rounded-sm w-fit ' key={p.id}>
                {p.name}
            </div>
        ))
      }
    </div>
  )
}

export default Platform
