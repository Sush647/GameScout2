import {createContext, useContext, useState} from "react"

const GamesContext=createContext(null);

export const GamesProvider=(props)=>{
  let[singlegame,setsinglegame]=useState(null)
  let[loading,setloading]=useState(true)

  

  const getGames=async (offset)=>{
    try{
      let response=await fetch(`https://gamescout-oxx1.onrender.com/games?offset=${offset}`);
    let data=await response.json();
    return data
    }catch(e){
      console.log(e)
    }
    
  }

  const getGame=async (gameid)=>{
    try{
      const response=await fetch(`https://gamescout-oxx1.onrender.com/game/${gameid}`);
      const data=await response.json();
      return data
    }catch(e){
      console.log(e)
    }finally{
      setloading(false)
    }
  }

  const searchgames=async(gamename)=>{
    try{
      const response=await fetch(`https://gamescout-oxx1.onrender.com/search/${gamename}`);
      const data=await response.json();
      return data
    }catch(e){
      console.log(e)
    }
  }


 
 

    return(
        <GamesContext.Provider value={{getGames,getGame,singlegame,setsinglegame,searchgames,loading,setloading}}>
            {props.children}
        </GamesContext.Provider>
    )
}

export const useGames=()=>{
    return useContext(GamesContext);
}