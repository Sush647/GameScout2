import React, { useEffect, useState } from "react";
import { usefirebase } from "../context/FirebaseContext";
import Card from "../components/Card";
import { useNavigate } from "react-router";

function Favourites() {
    const firebase=usefirebase()
    let[favgames,setfavgames]=useState([])
    const navigate=useNavigate()

    const getgames=async ()=>{
        let games=await firebase.getsavedgames(firebase.user?.uid);
        setfavgames(games.docs)
    }

    

    useEffect(()=>{
        if(!firebase.isloggedin){
            navigate('/')
        }
        window.scrollTo(0,0)
        getgames();
        return()=>{
            setfavgames([])
        }
    },[firebase.user])

  return (
    <div>
      <h1 className="text-white font-semibold text-xl mt-5 px-4 lg:px-0">
        My Favourites
      </h1>
        <div className={`${favgames.length>0?"hidden":""} h-screen w-full flex justify-center items-center`}>
        <h1 className='text-white font-semibold'>No Saved Games Available</h1>
        </div>

      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-6 mt-5 px-4 lg:px-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
      {
            favgames&&(
                favgames.map((game)=>(
                    <div key={game.data().gid}>
                    <Card image={game.data().image} title={game.data().title} onClick={()=>navigate(`/games/${game.data().gid}`)}/>
                    </div>
                ))
            )
        }
      </div>
    </div>
  );
}

export default Favourites;
