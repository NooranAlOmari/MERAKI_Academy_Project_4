import React, { useContext } from 'react';
import { AppContext } from '../../App';

const CartPage = () => {
    const { cart } = useContext(AppContext);  

    console.log('Cart data:', cart); // 

    return (
        <div>
            <h1>Your Cart</h1>

            {/*Check if the cart contains items*/}
            {cart && cart.items && cart.items.length > 0 ? (
                <div>
                    {cart.items.map((item, index) => (
                        <div key={index} className="cart-item">
                            <p>{item.product.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                        </div>
                    ))}
                    <h3>Total: ${cart.items.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
