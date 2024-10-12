import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';

const CartPage = () => {
    const { token } = useContext(AppContext);  

    const [cart, setCart] = useState(null);    
    const [error, setError] = useState(null);  

    useEffect(() => {
        const fetchCart = async () => {
            try {
                
                const response = await axios.get('http://localhost:5000/carts', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setCart(response.data.cart);
            } 
            catch (err) {
                console.error('Error fetching cart:', err);
                setError('Failed to load the cart.');
            }
        };

        fetchCart();  
    }, [token]);  

    //Function to increase or decrease the number
    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await axios.put('http://localhost:5000/carts/updateQuantity', {
                product: productId,
                quantity: newQuantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCart(response.data.cart); // Update basket data after modification
        } catch (err) {
            console.error('Error updating quantity:', err);
            setError('Failed to update the cart.');
        }
    };

    return (
        <div>
            <h1>Your Cart</h1>

            {/* If there are errors */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Check if the basket contains items */}
            {cart && cart.items && cart.items.length > 0 ? (
                <div>
                    {cart.items.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.product.image} alt={item.product.name} />
                            <p>{item.product.name}</p>
                            <p>Price: ${item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            
                            {/* Buttons to increase or decrease the number */}
                            <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                            <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>

                            <p>Total Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    
                    {/* Calculate the total of the basket*/}
                    <h3>Total: ${cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}</h3>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
