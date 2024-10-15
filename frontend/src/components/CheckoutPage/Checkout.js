import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillAlt, FaCreditCard } from 'react-icons/fa'; // icons
import './CheckoutPage.css'; 

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { token,cart  } = useContext(AppContext);
    
    const [shippingAddress, setShippingAddress] = useState({
        fullAddress: '',
        street: '',
        city: '',
        state: '',
        country: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('');
    const [note, setNotes] = useState(''); 
    const [error, setError] = useState(null);


    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        /***/const orderItems = cart.map(item => ({
            product: item.product._id, 
            quantity: item.quantity, 
            price: item.product.price 
        }));
    
        try {
            const response = await axios.post('http://localhost:5000/orders', {
                shippingAddress,
                paymentMethod,
                note,
                orderItems:orderItems /***/
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            if (response.data.success) {
                navigate(`/order/${response.data.order._id}`); 
            }
        } catch (err) {
            console.error('Error creating order:', err);
            setError('Failed to create the order.');
        }
    };
    

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <h1>Checkout</h1>
                {error && <p className="error-message">{error}</p>}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="checkout-header">
                    <h2>Shipping Address</h2>
                </div>
                
                <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Full Address" 
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullAddress: e.target.value })} 
                    required 
                />

                <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Street" 
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} 
                    required 
                />

                <input 
                    type="text" 
                    className="input-field" 
                    placeholder="City" 
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} 
                    required 
                />

                <input 
                    type="text" 
                    className="input-field" 
                    placeholder="State" 
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} 
                    required 
                />

                <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Country" 
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} 
                    required 
                />

                <div className="checkout-header">
                    <h2>Payment Method</h2>
                </div>

                <div className="payment-options">
                    <label className="payment-option">
                        <input 
                            type="radio" 
                            value="Cash" 
                            checked={paymentMethod === 'Cash'} 
                            onChange={(e) => setPaymentMethod(e.target.value)} 
                        />
                        <FaMoneyBillAlt /> Cash
                    </label>

                    <label className="payment-option">
                        <input 
                            type="radio" 
                            value="creditCard" 
                            checked={paymentMethod === 'creditCard'} 
                            onChange={(e) => setPaymentMethod(e.target.value)} 
                        />
                        <FaCreditCard /> Credit Card
                    </label>
                </div>

                <div className="checkout-header">
                    <h2>Special Requests</h2>
                </div>
                
                <textarea 
                    className="textarea-field" 
                    placeholder="Any special requests..." 
                    onChange={(e) => setNotes(e.target.value)} 
                />

                <button type="submit" className="submit-button">Submit Order</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
