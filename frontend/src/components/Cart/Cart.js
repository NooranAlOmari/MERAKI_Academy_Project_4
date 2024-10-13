import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = ({ productId, productName, productPrice, quantity, setQuantity }) => {
    const navigate = useNavigate();
    const { token, setupdateCart } = useContext(AppContext);

    const handleAddToCart = () => {
        const storedToken = localStorage.getItem('token') || token;

        if (!storedToken) {
            alert('You need to be logged in to add items to the cart.');
            navigate('/AuthPage');
            return;
        }

        axios.post('http://localhost:5000/carts/add', 
            { product: productId, quantity: quantity }, 
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
            if (response.data.success) {
                setupdateCart(response.data.cart);
                navigate(-1); 
            }
        })
        .catch((err) => {
            console.error('Error adding product to cart:', err);
        });
    };



    return (
        <div className="cart-component">

            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default Cart;
