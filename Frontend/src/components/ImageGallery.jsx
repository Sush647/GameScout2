import React, { useEffect, useState } from 'react'
import { useGames } from '../context/GamesContext'


 

function ImageGallery() {
    const game=useGames()
    let[images,setimages]=useState(null)

    useEffect(()=>{
        game.singlegame&&setimages(game.singlegame?.results?.images)
        
        return()=>{
          setimages(null)
        }
    })


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
      {images&&images.slice(0,9).map((image,index) => (
        <div key={index}>
          <img
            className="h-40 w-full max-w-full rounded-lg object-cover object-center  cursor-pointer duration-300"
            src={image.original}
            alt="gallery-photo"
          />
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
