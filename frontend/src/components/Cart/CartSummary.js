import React, { useContext, useState, useEffect } from 'react'; 
import { AppContext } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/****no use */
const CartSummary = () => {
    
    const { cart } = useContext(AppContext); 
    const navigate = useNavigate();


     // Calculate cart summary (subtotal, VAT, total)
    const calculateCartSummary = () => {
        if (cart && cart.length > 0) {
            const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
            const vat = subtotal * 0.05;
            const deliveryFree = 0.00; /* delivery free*/
            const total = subtotal + vat + deliveryFree;
            return { subtotal, vat, deliveryFree, total };
        }
        return { subtotal: 0, vat: 0, deliveryFree: 0, total: 0 };
    };
    const { subtotal, vat, deliveryFree, total } = calculateCartSummary();



    return(                   
        <div className="order-summary">
            <h3>Cart Summary</h3>
            <div className="summary-item">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
                <span>Delivery Free</span>
                <span>{deliveryFree === 0 ? 'Free' : `$${deliveryFree.toFixed(2)}`}</span>
            </div>
            <div className="summary-item vat">
                <span>VAT (5%)</span>
                <span>${vat.toFixed(2)}</span>
            </div>
            <div className="summary-item total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div className="buttons-container">
                <button onClick={() => navigate(-1)} className="button-">Add More</button>
                <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            </div>
        </div>
)

}



export default CartSummary;












    //
   // /**/const totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    ///**/const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);


    //return (
        //<div className="cart-summary" style={cartSummaryStyle}>

            //<p>Total: ${totalPrice.toFixed(2)} ({totalItems} items)</p>

            //<button onClick={() => navigate('/cart')}>Show Cart</button>
        //</div>
    //);
//};


//style
//const cartSummaryStyle = {
    //position: 'fixed',
    //bottom: '0',
    //right: '0',
    //backgroundColor: '#f8f9fa',
    //padding: '10px',
    //borderTopLeftRadius: '10px',
    //boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)'
//};

//export default CartSummary;
