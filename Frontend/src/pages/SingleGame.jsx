import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGames } from '../context/GamesContext';
import DOMPurify from "dompurify";
import ImageGallery from '../components/ImageGallery';
import { usePrice } from '../context/PriceContext';
import PriceCard from '../components/PriceCard';
import Card from '../components/Card';
import Genre from '../components/Genre';
import Platform from '../components/Platform';
import { FaHeart } from "react-icons/fa";
import { usefirebase } from '../context/FirebaseContext';


function SingleGame() {
    const params=useParams();
    const game=useGames();
    const price=usePrice();
    const firebase=usefirebase()
    let navigate=useNavigate()
    let[id,setid]=useState(null)
    let[pricelist,setpricelist]=useState(null)
    let[stores,setstores]=useState(null)

  

    

    const fetchgame=async()=>{
        const somedata=await game.getGame(params.gameid);
        game.setsinglegame(somedata)
    }

    const getpricebyname=async(name)=>{
        const data=await price.getPriceByName(name)
            setid(data[0].gameID)
    }

    const getpricebyid=async(id)=>{
        const data=await price.getPriceById(id)
        setpricelist(data?.deals)
    }

    const getstores=async()=>{
        const data=await price.getStoreData()
        setstores(data)

    }

    const checkfavourite=()=>{
        if(firebase.isloggedin){
            firebase.checkfav(params.gameid,firebase.user?.uid)
        }else{
            return
        }
        
    }

   
    useEffect(()=>{
        checkfavourite();
    },[params.gameid,firebase.user?.uid])
   

    

    useEffect( ()=>{
        window.scrollTo(0,0)
        fetchgame();
        getstores();
        return()=>{
            game.setsinglegame(null)
            setid(null)
            setstores(null)
            setpricelist(null)
            firebase.setdocid(null)
            game.setloading(true)
        }
    },[params.gameid])


    useEffect( ()=>{
        if(game.singlegame?.results?.name){
            getpricebyname(game.singlegame?.results?.name)
        }
        if(id){
            getpricebyid(id);
        }
        
    },[game.singlegame?.results?.name,id])

    
    


    const commonElements = stores&&stores.filter(store => 
        pricelist&&pricelist.some(price => price.storeID === store.storeID)
    );

    const addfav=()=>{
        if(!firebase.isloggedin){
            alert("You need to login in order to add favourites!")
            return
        }else{
            firebase.savedata(game.singlegame?.results?.name,game.singlegame?.results?.image.medium_url,params.gameid);
        }
    }

   

    const desc_clean=DOMPurify.sanitize(game.singlegame?.results?.description)

  return (
    <div className='relative'>

        {
            game.loading?(
                <div className='w-full h-screen flex justify-center items-center'>
                    <h1 className='font-semibold text-xl text-white'>Loading Please Wait...</h1>
                </div>
            ):(
                <div className='h-fit bg-custom-black mt-2 p-4 '>


                <div className=' w-full flex justify-center items-center flex-col gap-4 sm:flex-row sm:justify-start sm:gap-4 '>
                    <div className='h-64 overflow-hidden max-w-48 rounded-md'>
                        <img src={game.singlegame?.results?.image.medium_url} alt="" className=' h-full' />
                    </div>
                    <div className='text-white  text-center flex flex-col gap-1 sm:text-start'>
                        <h1 className='text-2xl font-semibold'>{game.singlegame?.results?.name}</h1>
                        <h1 className='text-base'>Developed by : {game.singlegame?.results?.developers?game.singlegame?.results?.developers[0].name:"not found"}</h1>
                        <h1 className='text-sm'>Released on : {game.singlegame?.results?.original_release_date} </h1>
                    </div>
                </div>
        
        
                <div className='mt-8 flex flex-col gap-2  '>
                    <h1 className='text-white font-semibold text-2xl'>Description</h1>
                    <p dangerouslySetInnerHTML={{__html:desc_clean?desc_clean:"not available"}} className={`desc lg:max-h-56 max-h-64 h-fit flex flex-col gap-2 text-white font-semibold overflow-y-scroll overflow-x-hidden p-4 shadow-inner shadow-gray-700 rounded-md`}></p>
                </div>
        
                <div className='mt-10 hidden md:block'>
                    <ImageGallery/>
                </div>
        
                
                <div className='mt-8 text-white'>
                    <h1 className='font-semibold text-2xl'>Prices and Deals!</h1>
                </div>
        
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-5'>
                    {
                       pricelist&&commonElements? pricelist.map((price,index)=>(
                           <div key={price.storeID}>
                             <PriceCard price={price.price} rprice={price.retailPrice} name={commonElements&&commonElements.map((el)=>(price.storeID==el.storeID&&el.storeName))} img={commonElements&&commonElements.find(el => price.storeID === el.storeID)?.images?.banner 
                        ? `https://www.cheapshark.com${commonElements.find(el => price.storeID === el.storeID).images.banner}`
                        : ""}/>
                           </div>
                           
                        )):
                        <h1 className='text-white'>Game Not Available</h1>
                    }
                </div>
        
                <div className='mt-8 text-white'>
                    <h1 className='font-semibold text-2xl'>Genre</h1>
                    <div className='mt-4 '>
                        <Genre/>
                    </div>
                </div>
        
        
                <div className='mt-8 text-white  max-w-[26rem]'>
                    <h1 className='font-semibold text-2xl'>Platforms</h1>
                    <div className='mt-4 '>
                    <Platform/>
                    </div>
                </div>
        
            
                <div className='text-white absolute top-5 right-5'>
                    <button className='h-12 w-12 rounded-full bg-custom-black-body flex justify-center items-center cursor-pointer' onClick={addfav}><FaHeart size="25px" color={`${firebase.favourite?"red":"white"}`}/></button>
                </div>
        
                <div className='h-10'>
        
                </div>
             
            </div>
            )
        }

   
    </div>
  )
}

export default SingleGame
