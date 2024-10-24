import React, { useContext } from 'react';
import './navbar.css'; 
import { AppContext } from '../../App'; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart  } = useContext(AppContext); 

  // ********optional chaining*********
  const totalItems = Array.isArray(cart) 
  ? cart.reduce((acc, item) => acc + item.quantity, 0) 
  : 0; 
console.log(cart)

  return (
    <nav className="navbar">

      <div className="navbar-item" onClick={() => navigate('/')}>
        <i className="fas fa-home"></i> Home
      </div>

      <div className="navbar-item" onClick={() => navigate('/my-orders')}>
        <i className="fas fa-box"></i> My Orders
      </div>

      <div className="navbar-item" onClick={() => navigate('/My Favorite')}>
        <i className="fas fa-heart"></i>
        Favorites
      </div>

      <div className="navbar-item" onClick={() => navigate('/cart')}>
  <i className="fas fa-shopping-cart"></i> Cart
  <span className="cart-count">{totalItems > 0 ? totalItems : 0}</span>
</div>

<div className="navbar-item" onClick={() => navigate('/AuthPage')}>
        <i className="fas fa-sign-in-alt"></i> Log In
      </div>


    </nav>
  );
};

export default Navbar;

//important to add optional chaining=> //cart?.items? &  // totalItems : 0