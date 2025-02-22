import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import Hero from '../components/Hero.jsx'
import Card from '../components/Card.jsx'
import { useGames } from '../context/GamesContext.jsx'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router'
import { usefirebase } from '../context/FirebaseContext.jsx'

function Home() {
    let games=useGames()
    const firebase=usefirebase()
    const navigate=useNavigate();
    let[gameData,setGameData]=useState(null)
    let[page,setPage]=useState(1);
    let[offset,setoffset]=useState(0);

   
    

    const fetchgames=async()=>{
        let data=await games.getGames(offset);
        setGameData(data.results)
    }

    const getnextpage=async ()=>{
        let newoffset=offset+20;
        setoffset(newoffset);
        let data=await games.getGames(newoffset);
        setGameData(data.results)
        setPage(page+1);
        window.scrollTo(0,0)
    }

    const getprevpage=async()=>{
        let newoffset=offset-20;
        setoffset(newoffset);
        let data=await games.getGames(newoffset);
        setGameData(data.results)
        setPage(page-1);
        window.scrollTo(0,0)
        
    }


    useEffect(()=>{
        fetchgames()
        if(firebase.user){
            firebase.user?.displayName?"":window.location.reload()
          }
    },[])

     
    
  return (
    <div >
    
     <div className='px-4 lg:px-0 mt-2'>
     <Hero onClick={() => document.getElementById("explore").scrollIntoView({ behavior: "smooth" })}/>
     </div>

     <h1 className='text-white font-semibold text-xl mt-5 px-4 lg:px-0' id='explore'>Explore Some Titles</h1>

     <div className='grid grid-cols-2 gap-3 md:gap-5 lg:gap-6 mt-5 px-4 lg:px-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 '>
        {
            gameData?(
                gameData.map((game)=>(
                    <div key={game.id}>
                    <Card image={game.image?.medium_url} title={game.name} onClick={()=>navigate(`/games/${game.guid}`)}/>
                    </div>
                ))
            ):
            <h1 className='text-white font-semibold'>Loading....</h1>
        }

        
     </div>

     <div className='w-full mt-10 flex justify-center items-center'>
        <div className='flex justify-center items-center gap-5'>
            {
                page>1&&<FaChevronLeft color='white' size={25} className='cursor-pointer' onClick={getprevpage}/>
            }
     
     <h1 className='text-white font-semibold text-2xl'>{page}</h1>
     <FaChevronRight color='white' size={25} className='cursor-pointer' onClick={getnextpage}/>
     </div>
     </div>

     <div className='h-10'>
        

     </div>
     




    </div>
  )
}

export default Home
