import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import { useParams } from 'react-router-dom';  
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import CartSummary from '../Cart/CartSummary';

const Products = () => {
    
    const navigate = useNavigate();

    const { setProducts, products ,
            setselectedproductId,
            cart
    } = useContext(AppContext);

    const { categoryId } = useParams();  

console.log(categoryId )
    useEffect(() => {
        if (categoryId) {
            axios.get(`http://localhost:5000/products/${categoryId}`)
                .then((response) => {
                    setProducts(response.data.products); // 
                })
                .catch((error) => {
                    console.log('Error fetching products for category:', error);
                });
        }
    }, [categoryId, setProducts]);  // Re-run when categoryId changes

    const handleCategoryClick = (productId) => {
        setselectedproductId(productId);
        navigate(`/products/details/${productId}`); //
        
    }

    console.log('Cart items:', cart)
    return (
        <div>
            {products && products.length > 0 ? (
                <div className="products-container">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image"
                            onClick={() => handleCategoryClick(product._id)} 
                            />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>{product.rating}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found for this category.</p>
            )}

            {/* Show CartSummary only if cart contains items*/}
            {cart && cart.items && cart.items.length > 0 && (
                <CartSummary />
            )}

        </div>
    );
};

export default Products;
