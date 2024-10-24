import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

/*****************0****************/
const Cart = ({ productId, productName, productPrice, quantity, setQuantity }) => {
    const navigate = useNavigate();
    const { token, setupdateCart } = useContext(AppContext);

const handleAddToCart = () => {
    const storedToken = localStorage.getItem('token') || token;

    if (!storedToken || storedToken === "undefined" || storedToken === null || !token || token === "undefined" || token === null) {
        alert('You need to be logged in to add items to the cart.');
        navigate('/AuthPage');
        return;
    }

    axios.post('http://localhost:5000/carts/add', 
        { product: productId, quantity: quantity }, 
        { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
        if (response.data.success) {
            setupdateCart(response.data.cart.items);
            toast.success('Product added to cart successfully!'); 
            navigate(-1); 
        } else {
            alert(response.data.message || 'Failed to add product.');
            console.log('Failed to add product:', response.data.message);
        }
    })
    .catch((err) => {
        if (err.response) {
            if (err.response.status === 403) {
                alert('You do not have permission to perform this action.'); 
            } else {
                alert(err.response.data.message || 'Failed to add product to cart.'); 
            }
            console.log('Error adding product to cart:', err.response.data);
        } else {
            alert('An unknown error occurred.'); 
            console.log('Error adding product to cart:', err);
        }
    });
};


    return (
        <div className="cart-component slide-up-animation">

            <button onClick={handleAddToCart}>Add to Cart</button>
            
        </div> 
    );
};

export default Cart;