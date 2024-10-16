import React, { useContext, useState, useEffect } from 'react'; 
import { AppContext } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CartSummary from './CartSummary';
import './cartpage.css';

const CartPage = () => {
    const navigate = useNavigate();
    const { token } = useContext(AppContext); 
    const [error, setError] = useState(null);
    const { setProducts, products, setselectedproductId, cart = [], setupdateCart } = useContext(AppContext);

    // Fetch cart data from the server
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:5000/carts', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data && response.data.cart ) {
                    setupdateCart(response.data.cart.items);  
                } else {
                    setupdateCart([]);  // Handle unexpected responses
                }
            } catch (err) {
                console.error('Error fetching cart:', err);
                setError('Failed to load the cart.');
            }
        };

        fetchCart();
    }, [token, setupdateCart]);

    // Update quantity of a product in the cart
    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await axios.put('http://localhost:5000/carts/updateQuantity', {
                product: productId,
                quantity: newQuantity
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data && response.data.cart && Array.isArray(response.data.cart.items)) {
                setupdateCart(response.data.cart.items);  // Update cart after quantity change
            }
        } catch (err) {
            console.error('Error updating quantity:', err);
            setError('Failed to update the cart.');
        }
    };

    // Remove product from the cart/**********/ /***************/
    const removeProduct = async (productId) => {
        try {
            const response = await axios.delete('http://localhost:5000/carts', {
                headers: { Authorization: `Bearer ${token}` },
                data: { product: productId }
            });

            if (response.data && response.data.deleted) {
                const filterCart = cart.filter((item) => item.product._id !== response.data.deleted);
                setupdateCart(filterCart);  // Update cart after product removal
            }
        } catch (err) {
            console.error('Error removing product:', err);
            setError('Failed to remove the product.');
        }
    };

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
        <div className="cart-page slide-up-animation">
            <h1>Your Cart</h1>
            {error && <p className="error-message">{error}</p>}
            {Array.isArray(cart) && cart.length > 0 ? (
                <div className="cart-items">
                    {cart.map((item, index) => (
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
                                    <i className="fas fa-trash"></i> {/* Delete icon */}
                                </button>
                                <p>Total Price: <strong>${(item.product.price * item.quantity).toFixed(2)}</strong></p>
                            </div>
                        </div>
                    ))}


                    {/* Order Summary */}
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
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
