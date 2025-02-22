import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GamesProvider } from './context/GamesContext.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import SingleGame from './pages/SingleGame.jsx'
import { PriceProvider } from './context/PriceContext.jsx'
import Search from './pages/Search.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import { Firebaseprovider } from './context/FirebaseContext.jsx'
import Favourites from './pages/Favourites.jsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/games/:gameid' element={<SingleGame/>}/>
      <Route path='/search/:gamename' element={<Search/>}/>
      <Route path='/favourites' element={<Favourites/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Firebaseprovider>
    <GamesProvider>
      <PriceProvider>
    <RouterProvider router={router} />
    </PriceProvider>
    </GamesProvider>
    </Firebaseprovider> 
  </StrictMode>,
)
