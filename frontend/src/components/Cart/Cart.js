import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';


const Cart = ({ productId, productName, productPrice, quantity, setQuantity }) => {
    const navigate = useNavigate();
    const { token, setupdateCart } = useContext(AppContext);

//Check if the token has expired بقدر اعملها ميدلوير باك اند
    const isTokenValid = (token) => {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 > Date.now(); 
    };

    const handleAddToCart = () => {
        
        console.log(token);
        if (!isTokenValid(token) || !token || token === "undefined" || token === null) {
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
                setupdateCart(response.data.cart.items);
                console.log("i am here")
                console.log(response.data.cart.items
                )
                console.log(response.data.cart
                )
                console.log('Adding product to cart...');
                toast.success('Product added to cart successfully!'); // Success notification
                navigate(-1); 
                
            } else {
                console.log('Failed to add product:', response.data.message);
            }
        })
        .catch((err) => {
            console.log('Error adding product to cart:', err);
        });
    };

    return (
        <div className="cart-component slide-up-animation">

            <button onClick={handleAddToCart}>Add to Cart</button>
            
        </div> 
    );
};

export default Cart;