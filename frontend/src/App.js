import React from 'react'
import "./App.css";
import { useState, createContext } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";

import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home'
export const AppContext = createContext();

const App = () => {
  
  
  const [token, setToken] = useState(localStorage.getItem('token')||'')
  
  return (

<AppContext.Provider value=
    {{
    token, setToken,
    }}>
<Navbar></Navbar>
    <div className="App">
    <header className="App-header">
      <h1>App</h1>
    </header>
    
    </div>



   <Routes>
   <Route path="/" element={<Home/>} />

     

   </Routes>

</AppContext.Provider>
  

  )
}




export default App;
   //<Route path="/" element={<Register/>} />