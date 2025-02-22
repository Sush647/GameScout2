import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router';
import { usefirebase } from '../context/FirebaseContext';
import Profile from './Profile';

function Navbar() {
  const navigate=useNavigate();
  const firebase=usefirebase();
    let[searchBar,setSearchbar]=useState(false)
    let[gamename,setgamename]=useState("")

    const search=(e)=>{
      if(e.key==="Enter"){
        if(gamename===""){
          return
        }else{
          navigate(`/search/${gamename}`)
          setgamename("")
        }
      }
      
    }

    const fav=()=>{
      if(firebase.isloggedin){
        navigate('/favourites')
      }else{
        alert("Please login to view your saves!")
      }
    }

    
    const logout=()=>{
      firebase.logout();
      navigate('/');
    
    }

  return (
    <div>
      <div className='bg-custom-black h-14 p-3 px-4 gap-3 shadow-sm shadow-black flex items-center justify-between'>
        <div className='flex gap-4 items-center'>
            <h1 className='text-white font-semibold text-lg cursor-pointer' onClick={()=>{navigate("")}}>GameScout</h1>
        </div>

        <li className='hidden text-white lg:flex gap-20'>
          <ul className='cursor-pointer ' onClick={()=>{navigate('/')}}>Home</ul>
          <ul className='cursor-pointer' onClick={fav}>Favourites</ul>
          <ul className='cursor-pointer' >About</ul>
        </li>

        <div className={`${searchBar?"block":"hidden"} w-full px-3 duration-300`}>
            <input type="text" value={gamename} onChange={(e)=>{setgamename(e.target.value)}} onKeyDown={search} className='w-full text-white outline-none border-b-2 border-gray-500 px-1' placeholder='search here..' />
        </div>

        <div className='flex gap-5 lg:gap-6 items-center'>
            <span className='text-white cursor-pointer' onClick={()=>setSearchbar(!searchBar)} >{searchBar?<IoCloseSharp size={20}/>:<FaSearch size={20}/>}</span>
            {
              firebase.isloggedin?(
                <div className={`${searchBar?"hidden":"block"} text-white cursor-pointer`}><Profile name={firebase.user?.displayName} onClick={logout}/></div>
              ):(
                <button className={`${searchBar?"hidden":"block"} text-white cursor-pointer`} onClick={()=>{navigate('/signup')}}>Sign up</button>
              )
            }
        </div>


      </div>
    </div>
  )
}

export default Navbar
