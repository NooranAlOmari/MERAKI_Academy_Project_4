import React from 'react';
import './navbar.css'; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-item" onClick={() => navigate('/')}>
        <i className="fas fa-home"></i> Home
      </div>
      <div className="navbar-item" onClick={() => navigate('/AuthPage')}>
        <i className="fas fa-sign-in-alt"></i> Log In
      </div>
      <div className="navbar-item">
        <i className="fas fa-shopping-cart"></i> Cart
      </div>
      <div className="navbar-item">
        <i className="fas fa-box"></i> My Orders
      </div>
      <div className="navbar-item">
        <i className="fas fa-search"></i> Search
      </div>
    </nav>
  );
};

export default Navbar;
