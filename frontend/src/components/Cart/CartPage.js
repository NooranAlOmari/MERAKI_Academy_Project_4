import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';
import CartSummary from './CartSummary';

import './cartpage.css';

const CartPage = () => {
    const { token } = useContext(AppContext);
    const [error, setError] = useState(null);
    const { setProducts, products, setselectedproductId, cart, setupdateCart } = useContext(AppContext);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:5000/carts', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setupdateCart(response.data.cart);
            } catch (err) {
                console.error('Error fetching cart:', err);
                setError('Failed to load the cart.');
            }
        };

        fetchCart();
    }, [token, cart]);

    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await axios.put('http://localhost:5000/carts/updateQuantity', {
                product: productId,
                quantity: newQuantity
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setupdateCart(response.data.cart);
        } catch (err) {
            console.error('Error updating quantity:', err);
            setError('Failed to update the cart.');
        }
    };

    const removeProduct = async (productId) => {
        try {
            const response = await axios.delete('http://localhost:5000/carts', {
                headers: { Authorization: `Bearer ${token}` },
                data: { product: productId }
            });

            setupdateCart(response.data.cart);
        } catch (err) {
            console.error('Error removing product:', err);
            setError('Failed to remove the product.');
        }
    };

    const calculateTotal = () => {
        if (cart && cart.items.length > -1) {
            return cart.items.reduce((total, item) => {
                return total + (item.product.price * item.quantity);
            }, 0).toFixed(2);
        }
        return 0;
    };

        

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {error && <p className="error-message">{error}</p>}
            {cart && cart.items && cart.items.length > 0 ? (
                <div className="cart-items">
                    {cart.items.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="item-image">
                                <img src={item.product.image} alt={item.product.name} className="product-imagee" />
                            </div>
                            <div className="item-details">
                                <h2>{item.product.name}</h2>
                                <p>Price per unit: <strong>${item.product.price}</strong></p>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                                </div>
                                <button onClick={() => removeProduct(item.product._id)} className="remove-button">
                                  <i className="fas fa-trash"></i> {/* أيقونة الحذف */}
                                </button>
                                <p>Total Price: <strong>${(item.product.price * item.quantity).toFixed(2)}</strong></p>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total: <strong>${calculateTotal()}</strong></h3>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <CartSummary/>
        </div>
    );
};

export default CartPage;
