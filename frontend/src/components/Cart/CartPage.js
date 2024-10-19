import React, { useContext, useState, useEffect } from 'react'; 
import { AppContext } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CartSummary from './CartSummary';
import './cartpage.css';

const CartPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { token,setProducts, products, setselectedproductId, cart, setupdateCart } = useContext(AppContext);

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
      
          if (response.data && response.data.cart) {
            const updatedCart = response.data.cart.items;
            setupdateCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // تحديث السلة في localStorage
          }
        } catch (err) {
          console.error('Error updating quantity:', err);
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
            const updatedCart = cart.filter((item) => item.product._id !== response.data.deleted);
            setupdateCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // تحديث السلة في localStorage
          }
        } catch (err) {
          console.error('Error removing product:', err);
        }
      };
      
/**************************************** */
//بتحقق انها array عشان اذا ما كان اله في لوكل ستوريج سلة فقيمتها انديفايند او نال فما رح تزبط عليها ريديوس و اذا كبس لعرض السلة قبل ما يضيف منتجات و قبل ما تصير باللوكل ستوريج رح يطلع ايرور 

    // Calculate cart summary (subtotal, VAT, total)
const calculateCartSummary = () => {
    const vatRate = 0.05;  // نسبة الضريبة
    const deliveryFee = 2.00;  // تكلفة التوصيل

 // Check that cart is an array and contains elements
 if (Array.isArray(cart) && cart.length > 0) {
    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const vat = subtotal * vatRate;
    const total = subtotal + vat + deliveryFee;

    return { subtotal, vat, deliveryFee, total };
}

// في حال كانت السلة فارغة أو غير صالحة
return { subtotal: 0, vat: 0, deliveryFee: deliveryFee, total: 0 };
};

const { subtotal, vat, deliveryFee, total } = calculateCartSummary();
/**************************************************** */

    const handleCheckout = () => {
        navigate('/checkout');  // Go to Checkout page
        window.location.reload(); // Reload the page /*عشان مشكلة الخريطة ما بتطلع الا بعد اعادة تحميل الصفحة */
        
        
    };
    return (
        <div className='all-the-page'>
        <div className="cart-page ">
            <h1 className='YourCart'>Your Cart</h1>
            {error && <p className="error-message">{error}</p>}
            {Array.isArray(cart) && cart.length > 0 ? (
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item slide-up-animation">
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
                            <span>Delivery Fee</span>
                            <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
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
                            <div>
            {/* Go to Checkout page and reload page button*/}
            <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
        </div>
    );
};

export default CartPage;
