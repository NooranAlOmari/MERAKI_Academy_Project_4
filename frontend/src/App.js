import React from 'react'
import "./App.css";
import { useState, createContext } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";

import AdminPanel from './components/AdminPanel/AdminPanel';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home'
import AuthPage from './components/AuthPage/AuthPage';
export const AppContext = createContext();

const App = () => {
  
  
  const [token, setToken] = useState(localStorage.getItem('token')||'')
  
  return (

<AppContext.Provider value=
    {{
    token, setToken,
    }}>
    
    <Navbar/>
    <div className="App">
    <header className="App-header">
    </header>
    
    </div>



   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/adminPanel" element={<AdminPanel/>} />
    <Route path="/AuthPage" element={<AuthPage/>} />

   </Routes>


</AppContext.Provider>
  

  )
}




export default App;
   //<Route path="/" element={<Register/>} />