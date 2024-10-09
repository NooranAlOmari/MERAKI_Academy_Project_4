import React from 'react';
import './navbar.css'; 
import {useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav className="navbar">
        <ul className="navbar-list">
        <li className="navbar-item" onClick={() => navigate('/')}>home</li>

            <li className="navbar-item" onClick={() => navigate('/AuthPage')}>login</li>

            <li className="navbar-item">cart</li>

            <li className="navbar-item">my orders</li>

            <li className="navbar-item">search</li>
        </ul>
    </nav>
  );
};

export default Navbar;
