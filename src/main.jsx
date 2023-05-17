import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {AppContextProvider} from "./components/AppContextProvider.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
        <Router basename={'/Pic-some-react-project'}>
        <App />
        </Router>
    </AppContextProvider>
  </React.StrictMode>,
)

