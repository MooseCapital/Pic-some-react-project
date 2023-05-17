import {useContext, useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx";
import Photos from "./pages/Photos.jsx"
import Cart from "./pages/Cart.jsx";
import {AppContext} from "./components/AppContextProvider.jsx";


function App(props) {

 const app = useContext(AppContext)



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
