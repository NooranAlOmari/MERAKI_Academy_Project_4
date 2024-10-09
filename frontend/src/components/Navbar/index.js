import React from 'react';
import './navbar.css'; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item" onClick={() => navigate('/')}>Home</li>
        <li className="navbar-item" onClick={() => navigate('/AuthPage')}>Login</li>
        <li className="navbar-item">Cart</li>
        <li className="navbar-item">My Orders</li>
        <li className="navbar-item">Search</li>
      </ul>
    </nav>
  );
};

export default Navbar;
