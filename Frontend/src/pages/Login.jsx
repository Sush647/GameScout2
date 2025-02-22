import React, { useEffect, useState } from 'react'
import bg from '../images/hero.jpg'
import { useNavigate } from 'react-router'
import { usefirebase } from '../context/FirebaseContext'

function Login() {
    const navigate=useNavigate()
    const firebase=usefirebase()
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");

    const login=(e)=>{
        if(email==""||password==""){
            e.preventDefault()
            alert("fields cannot be empty!")
            return
        }else{
            e.preventDefault()
            firebase.login(email,password)
        }
    }

    useEffect(()=>{
        if(firebase.isloggedin){
            navigate('/')
        }
    },[firebase.user])


    const loginwithgoogle=(e)=>{
        e.preventDefault()
        firebase.loginwithgoogle()
    }
  return (
     <div className='flex justify-center items-center h-screen  bg-center bg-no-repeat bg-cover mt-2' style={{backgroundImage:`url(${bg})`}}>
         <form className='backdrop-blur-lg ring-1 ring-black shadow-md shadow-black w-full max-w-fit sm:max-w-96 md:max-w-[28rem] h-fit py-5 px-8 rounded-xl'>
    
            <h1 className='text-white font-semibold text-2xl w-full text-center'>Login</h1>
    
            <div className='flex flex-col items-center justify-center gap-3 mt-3'>

    
            <div className='flex flex-col gap-1 w-full' >
                <label htmlFor="Email" className='text-white font-semibold text-xl'>Email</label>
                <input type="email" placeholder='enter your email' className='outline-none bg-white p-2 w-full rounded-md' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            </div>
    
            <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="Password" className='text-white font-semibold text-xl'>Password</label>
                <input type="password" placeholder='enter your password' className='outline-none bg-white p-2 w-full rounded-md'  value={password} onChange={(e)=>{setpassword(e.target.value)}} />
            </div>
            </div>
    
            <div className='w-full flex flex-col gap-3 mt-3'>
                <button className='w-full p-2 bg-gray-800 text-white font-semibold text-lg rounded-md active:bg-gray-600 cursor-pointer' onClick={login}>Login</button>
    
                <div className='flex justify-center items-center gap-2'>
                <div className='w-full border-b-2 border-white'></div>
                <h1 className='text-sm font-semibold text-white'>Or</h1>
                <div className='w-full border-b-2 border-white'></div>
                </div>
    
                <button className='w-full p-2 bg-red-500 text-white font-semibold text-lg rounded-md active:bg-red-700 cursor-pointer' onClick={loginwithgoogle}>Login with Google</button>
    
                <div className='flex gap-1 justify-center items-center text-white font-semibold'>
                    <h1>Don't have an account?</h1>
                    <h1 className='cursor-pointer' onClick={()=>{navigate('/signup')}}>Signup</h1>
                </div>
            </div>
         </form>
        </div>
  )
}

export default Login
