import React from 'react';
import './navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
        <ul className="navbar-list">
            <li className="navbar-item">home</li>
            <li className="navbar-item">login</li>
            <li className="navbar-item">cart</li>
            <li className="navbar-item">my orders</li>
            <li className="navbar-item">search</li>
        </ul>
    </nav>
  );
};

export default Navbar;
