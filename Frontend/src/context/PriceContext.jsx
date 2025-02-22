import {createContext,useContext, useState} from "react";

const PriceContext=createContext(null);

export const PriceProvider=(props)=>{


    const baseurl="https://www.cheapshark.com/api/1.0/"

    const getPriceByName=async (name)=>{
        try{
        const response=await fetch(`${baseurl}/games?title=${name}`)
        const data=await response.json();
        return data
        }
        catch(e){
            console.log(e)
        }
        
    }

    const getPriceById=async (gameid)=>{
        try{
        const response=await fetch(`${baseurl}/games?id=${gameid}`)
        const data=await response.json()
        return data
        }
        catch(e){
            console.log(e)
        }
        
    }

    const getStoreData=async ()=>{
        try{
            const response=await fetch(`${baseurl}/stores`)
            const data=await response.json()
            return data
        }
        catch(e){
            console.log(e)
        }
       
    }
    return(
        <PriceContext.Provider value={{getPriceByName,getPriceById,getStoreData}}>
            {props.children}
        </PriceContext.Provider>
    )
}

export const usePrice=()=>{
    return useContext(PriceContext);
}