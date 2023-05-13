import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx";
import Photos from "./pages/Photos.jsx"
import Cart from "./pages/Cart.jsx";
//image import
//const viteLogo = new URL('/vite.svg', import.meta.url).href

function App() {


  return (
        <div id={"container"}>
            <Header/>



            <Routes>
                <Route path={"/"} element={<Photos/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
            </Routes>

        </div>
  )
}

export default App
