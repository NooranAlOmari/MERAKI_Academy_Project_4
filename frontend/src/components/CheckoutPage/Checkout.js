import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillAlt, FaCreditCard } from 'react-icons/fa';
import './CheckoutPage.css'; 
import MapComponent from '../MapComponent/MapComponent';
import LocationComponent from '../MapComponent/LocationComponent';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { token, cart } = useContext(AppContext);
    
    const [shippingAddress, setShippingAddress] = useState({
        fullAddress: '',
        street: '',
        city: '',
        state: '',
        country: '',
        coordinates: { latitude: null, longitude: null } 
    });

    const [paymentMethod, setPaymentMethod] = useState('');
    const [note, setNotes] = useState(''); 
    const [error, setError] = useState(null);

    const handleLocationChange = (location) => {
        setShippingAddress((prev) => ({
            ...prev,
            coordinates: location
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (cart.length === 0) {
            console.error('Cart is empty. Cannot create order.');
            setError('Sorry, your cart is empty');
            return;
        }
    
        if (!shippingAddress.coordinates || !shippingAddress.coordinates.latitude || !shippingAddress.coordinates.longitude) {
            console.error('Shipping address coordinates are missing.');
            setError('Please enter address coordinates.');
            return;
        }

        const { fullAddress, street, city, state, country } = shippingAddress;
        if (!fullAddress || !street || !city || !state || !country) {
            console.error('Please fill in all shipping address fields.');
            setError('Please fill in all shipping address fields.');
            return;
        }
    
        const orderItems = cart.map(item => ({
            product: item.product._id, 
            quantity: item.quantity, 
            price: item.product.price 
        }));
    
        console.log('Order items:', orderItems);
        console.log('Shipping address:', shippingAddress);
    
        try {
            const response = await axios.post('http://localhost:5000/orders', {
                shippingAddress,
                paymentMethod,
                note,
                orderItems
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                navigate(`/order/${response.data.order._id}`); 
            }
        } catch (err) {
            console.error('Error creating order:', err.response ? err.response.data : err.message);
            setError('Failed to create request');
        }
    };

    useEffect(() => {
        // Call the location handler if coordinates are not set
        if (!shippingAddress.coordinates.latitude && !shippingAddress.coordinates.longitude) {
            ///*****to automatically get the user's location
            // can be removed
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    handleLocationChange({ latitude, longitude });
                },
                (err) => console.error('Error fetching location on mount:', err)
            );
        }
    }, [shippingAddress.coordinates]);

    return (
        <div className="checkout-container cart-page slide-up-animation">
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
                    placeholder="phone Number" 
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

                <LocationComponent onLocationChange={handleLocationChange} />
                <MapComponent coordinates={shippingAddress.coordinates} /> {/* Pass coordinates to map component */}

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


//note useEffect(() => {
       /* // Call the location handler if coordinates are not set
        if (!shippingAddress.coordinates.latitude && !shippingAddress.coordinates.longitude) {
            // Optionally to automatically get the user's location
            // This line can be removed if  want to avoid auto-fetching the location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    handleLocationChange({ latitude, longitude });
                },
                (err) => console.error('Error fetching location on mount:', err)
            );
        }
    }, [shippingAddress.coordinates]);*/
