import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';  
import axios from 'axios';
import Cart from '../Cart/Cart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './productDetails.css'

const ProductDetails = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);  
    const { productId } = useParams();  
    

    useEffect(() => {
        if (productId) {
            axios.get(`http://localhost:5000/products/details/${productId}`)
                .then((response) => {
                    setProduct(response.data.product);
                })
                .catch((error) => {
                    console.log('Error fetching product details:', error);
                });
        }
    }, [productId]);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const totalPrice = product ? (product.price * quantity).toFixed(2) : 0;


    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <div className="product-details">
            {product ? (
                
                <div className="product-info">
                    {/* Back*/}
                    <button className="view-menu-btn" onClick={handleBackClick}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className="image-container">
                        <img src={product.image} alt={product.name} className="product-details-image rotating-image" />
                    </div>

                    <div className="details-container">

                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">Price per unit: ${product.price}</p>

                        {/* Quantity control*/}
                        <div className="quantity-selector">
                    <button className="quantity-btn" onClick={decreaseQuantity} disabled={quantity === 1}>-</button>
                    <span className="quantity-display">{quantity}</span>
                    <button className="quantity-btn" onClick={increaseQuantity}>+</button>
                </div>


                        <p className="total-price">Total Price : ${totalPrice}</p>

                        {/* add to cart button */}
                        <div className="cart-component">
                            <Cart 
                                productId={product._id} 
                                productName={product.name} 
                                productPrice={product.price} 
                                quantity={quantity} 
                                hideQuantityControls={true}  
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <p className="loading-message">Loading product details...</p>
            )}

             {/* View Menu Button */}
             <button className="view-menu-btn" onClick={handleBackClick}>
                        <span className="arrow-icon">←</span> View Menu
                    </button>
        </div>

    );
};

export default ProductDetails;
