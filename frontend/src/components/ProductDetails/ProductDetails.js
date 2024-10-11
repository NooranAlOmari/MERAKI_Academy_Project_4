import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  
import axios from 'axios';
import Cart from '../Cart/Cart';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);

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
    


    return (
        <div className="product-details">
            {product ? (
                <>
                    <img src={product.image} alt={product.name} className="product-details-image" />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>

                    {/*Cart component &
                    passing data as props*/}
                    <Cart 
                        productId={product._id} 
                        productName={product.name} 
                        productPrice={product.price}
                    />
                </>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductDetails;


