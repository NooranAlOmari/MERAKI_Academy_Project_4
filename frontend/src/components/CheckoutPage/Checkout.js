import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillAlt, FaCreditCard } from 'react-icons/fa';
import './CheckoutPage.css'; 
import MapComponent from '../MapComponent/MapComponent';
import LocationComponent from '../MapComponent/LocationComponent';
import CartSummary from '../Cart/CartSummary';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { token, cart } = useContext(AppContext);
    
    // Default coordinates (e.g., city center or a default location)
    const defaultCoordinates = { latitude: 25.276987, longitude: 55.296249 }; // Example for Dubai

    const [shippingAddress, setShippingAddress] = useState({
        fullAddress: '',
        street: '',
        city: '',
        state: '',
        country: '',
        coordinates: defaultCoordinates // Default to some coordinates
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

    console.log("hi this is the cart");
    console.log(cart);

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
        // Automatically fetch user's location on mount
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                handleLocationChange({ latitude, longitude });
            },
            (err) => {
                console.error('Error fetching location:', err);
                // We continue with the default coordinates if the location is not available
            }
        );
    }, []);

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
                    placeholder="Country" 
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} 
                    required 
                />

                <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Phone Number" 
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} 
                    required 
                />

                {/* Show Location and Map */}
                <LocationComponent onLocationChange={handleLocationChange} />
                {/* Directly rendering the MapComponent here */}
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
                </div>
                
                <button type="submit" className="submit-button">Submit Order</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
