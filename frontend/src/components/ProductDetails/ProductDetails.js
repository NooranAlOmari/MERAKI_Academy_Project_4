import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  
import axios from 'axios';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);  // 

    const { productId } = useParams();  

    useEffect(() => {
        if (productId) {
            console.log('Fetching product with ID:', productId);
            axios.get(`http://localhost:5000/products/details/${productId}`)
                .then((response) => {
                    console.log('Product details:', response); 
                    setProduct(response.data.product);
                })
                .catch((error) => {
                    console.log('Error fetching product details:', error);
                });
        }
    }, [productId]);
    
    const handleAddToCart = () => {
        console.log(`Adding ${quantity} of ${product.name} to the cart`);
        // add to cart
    };

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (
        <div className="product-details">
            {product ? (
                <>
                    <img src={product.image} alt={product.name} className="product-details-image" />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>

                    {/* counter */}
                    <div className="quantity-control">
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>

                    {/*Add to cart*/}
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductDetails;


