import React, { useContext,useState, useEffect } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';

const CartPage = () => {
    const { token } = useContext(AppContext);  

      
    const [error, setError] = useState(null); 

    const { setProducts, products ,
        setselectedproductId,
        cart, setupdateCart

} = useContext(AppContext);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                
                const response = await axios.get('http://localhost:5000/carts', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setupdateCart(response.data.cart);
            } 
            catch (err) {
                console.error('Error fetching cart:', err);
                setError('Failed to load the cart.');
            }
        };

        fetchCart();  
    }, [token , cart]);  


    //Function to increase or decrease the number of Quantity 
    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await axios.put('http://localhost:5000/carts/updateQuantity', {
                product: productId,
                quantity: newQuantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setupdateCart(response.data.cart); // Update cart data after modification
        } catch (err) {
            console.error('Error updating quantity:', err);
            setError('Failed to update the cart.');
        }
    };

// Function to remove product from cart
    const removeProduct = async (productId) => {
        try {
            const response = await axios.delete('http://localhost:5000/carts', {
                headers: {Authorization: `Bearer ${token}`},
                data: { product: productId }
            });

            setupdateCart(response.data.cart); // Update cart data after removal
        } 
        catch (err) {
            console.error('Error removing product:', err);
            setError('Failed to remove the product.');
        }
    };

//calculate Total of all products in the cart
    const calculateTotal = () => {
        if (cart && cart.items.length>-1) {
            return cart.items.reduce((total, item) => {
                return total + (item.product.price * item.quantity);
            }, 0).toFixed(2); 
        }
        return 0; //If the cart is empty
    };


    return (
        <div>
            <h1>Your Cart</h1>

            {/* If there are errors */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Check if the basket contains items */}
            {cart && cart.items && cart.items.length > 0 ? (
                <div>
                    {cart.items.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.product.image} alt={item.product.name} />
                            <p>{item.product.name}</p>
                            <p>Price: ${item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            
                            {/* Buttons to increase or decrease the number */}
                            <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                            <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>

                            {/*Button to remove the product*/}
                            <button onClick={() => removeProduct(item.product._id)} style={{ marginLeft: '10px', color: 'red' }}>Remove</button>

                            <p>Total Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}

                    {/* Calculate the total of the basket*/}
                    <h3>Total: ${calculateTotal()}</h3>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
