import React, {useContext,useEffect,useState} from 'react'
import {AppContext} from '../../App'
import {useNavigate } from "react-router-dom";
import axios from 'axios';

const Cart = ({ productId, productName, productPrice }) => {

    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState(''); 

    const{
        token,
        isLoggedIn , setIsLoggedIn,
        }= useContext(AppContext);

    const handleAddToCart = () => {
        // If user is not logged in
        if (!isLoggedIn) {
            alert('You need to be logged in to add items to the cart.');
            navigate('/AuthPage')
            return;
        }
        // If logged in, complete the process
        axios.post('http://localhost:5000/carts/add', 
            {product: productId  ,  quantity: quantity}, 
            {headers: {Authorization: `Bearer ${token}`  }
        })
        .then((response) => {
            if (response.data.success) {
                setMessage('Product added to cart successfully!');
                
            } else {
                setMessage('Failed to add product to cart.');
            }
        })
        .catch((err) => {
            console.error('Error adding product to cart:', err);
            setMessage(err.response.data.message)        });
    };

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (
        <div className="cart-component">
            <h2>{productName}</h2>
            <p>Price: ${productPrice}</p>

            {/* Counter for quantity */}
            <div className="quantity-control">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
            </div>

            <button onClick={handleAddToCart}>Add to Cart</button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Cart;
