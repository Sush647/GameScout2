import React, { useEffect, useState } from 'react'
import { useGames } from '../context/GamesContext'
import { useNavigate, useParams } from 'react-router';
import Card from '../components/Card';

function Search() {
  let game=useGames();
  let params=useParams();
  let[gamelist,setgamelist]=useState(null)
  const navigate=useNavigate()
  const fetchlist=async ()=>{
    const data=await game.searchgames(params.gamename)
    setgamelist(data.results)
  }
  

  useEffect(()=>{
    fetchlist();
    return()=>{
      setgamelist(null)
    }
  },[params.gamename])

  
  return (
    <div>
       <h1 className='text-white font-semibold text-xl mt-5 px-4 lg:px-0'>Search Results for {params.gamename}:</h1>

<div className='grid grid-cols-2 gap-3 md:gap-5 lg:gap-6 mt-5 px-4 lg:px-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 '>
   {
       gamelist?(
           gamelist.map((game)=>(
               <div key={game.id}>
               <Card image={game.image?.medium_url} title={game.name} onClick={()=>navigate(`/games/${game.guid}`)}/>
               </div>
           ))
       ):
       <h1 className='text-white font-semibold'>Loading....</h1>
   }
  
</div>
    </div>
  )
}

export default Search
