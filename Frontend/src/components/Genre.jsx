import React, { useEffect, useState } from 'react'
import { useGames } from '../context/GamesContext'

function Genre() {
    let game=useGames()
    let [genre,setgenre]=useState(null)

    useEffect(()=>{
        game.singlegame&&setgenre(game.singlegame.results?.genres)
        return()=>{
            setgenre(null)
        }
    },[game.singlegame])

   
  return (
    <div className='flex flex-wrap gap-2  w-max-96 w-fit '>
      {
        genre&&genre.map((g)=>(
            <div className='px-4 py-3 font-semibold text-white bg-custom-black-body rounded-sm w-fit ' key={g.id}>
                {g.name}
            </div>
        ))
      }
    </div>
  )
}

export default Genre
