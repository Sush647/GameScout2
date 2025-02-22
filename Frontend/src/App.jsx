import { useState } from 'react'
import Home from './pages/Home';
import { Outlet } from 'react-router';
import Navbar from "./components/Navbar"
import Footer from './components/Footer';



function App() {

 
  return (
    <>
    <div className='lg:px-36 '>
    <Navbar/>

    <div className='min-h-screen'>
    <Outlet/>
    </div>

    <div className='mt-5'><Footer/></div>
    </div>
    
    </>
  )
}

export default App
