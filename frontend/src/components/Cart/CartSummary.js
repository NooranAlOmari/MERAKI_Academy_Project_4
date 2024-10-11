import React, { useContext } from 'react';
import { AppContext } from '../../App'; 
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
    
    const { cart } = useContext(AppContext); 
    const navigate = useNavigate();

    /**/const totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    /**/const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);


    return (
        <div className="cart-summary" style={cartSummaryStyle}>

            <p>Total: ${totalPrice.toFixed(2)} ({totalItems} items)</p>

            <button onClick={() => navigate('/cart')}>Show Cart</button>
        </div>
    );
};


//style
const cartSummaryStyle = {
    position: 'fixed',
    bottom: '0',
    right: '0',
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderTopLeftRadius: '10px',
    boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)'
};

export default CartSummary;
