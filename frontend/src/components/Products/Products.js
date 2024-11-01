import React, {useContext,useEffect,useState} from 'react';
import { AppContext } from '../../App';
import { useParams } from 'react-router-dom';  
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import CartSummary from '../Cart/CartSummary';
import './Product.css'
import 'font-awesome/css/font-awesome.min.css';

import {  FaFire, FaAppleAlt } from 'react-icons/fa';
import { FaHeart, FaDollarSign } from 'react-icons/fa';
import { MdAttachMoney, MdLocalFireDepartment } from 'react-icons/md'; 
import { FaMoneyBillWave } from 'react-icons/fa';
import { FaFireAlt } from 'react-icons/fa'; // أيقونة النار
import 'font-awesome/css/font-awesome.min.css';



const Products = () => {
    
    const navigate = useNavigate();


    const { setProducts, products ,
            setselectedproductId,
            cart,
            favorites, setFavorites
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


   // Function to change the favorite state
    const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
        // If the product is a favorite, remove it from the list.
        setFavorites(favorites.filter(id => id !== productId));
    } else {
        // If not preferred, add it to the list.
        setFavorites([...favorites, productId]);
    }
};

/******************************/
/***Change video by category***/
let videoSrc = '';
if (categoryId === '670742a13bced54c5a10bfa9') {
    videoSrc = '/home-video.mp4';  
} else if (categoryId === '6707455a3bced54c5a10bfaf') {
    videoSrc = '/main_meat.mp4';  
} else if (categoryId === '6710d7048e60dc47690cd6f3') {
    videoSrc = '/main_vegitrerian.mp4';  
} else if (categoryId === '6710dc448e60dc47690cd750') {
    videoSrc = '/main_desert.mp4';  
} else if (categoryId === '6710de418e60dc47690cd754') {
    videoSrc = '/main_beverges.mp4';  
} else if (categoryId === '6707455a3bced54c5a10bfaf') {
    videoSrc = '/12345678.mp4';  
} else if (categoryId === '6707455a3bced54c5a10bfaf') {
    videoSrc = '/12345678.mp4';  
} else if (categoryId === '6707455a3bced54c5a10bfaf') {
    videoSrc = '/12345678.mp4';  
} else {
    videoSrc = '/istockphoto-1822750530-640_adpp_is.mp4';  
}
/******************************/
/******************************/


return (
    <section className="The-section slide-up-animation">
        <section className="upper-section">
            <div className="hero-content">
                <span className="small-text">Hungry?</span>
                <h1>WELCOME TO <br /> FOODIE HEAVEN</h1>
                <p>Explore the most delicious and tasty recipes here. Order now to satisfy your cravings!</p>
            </div>
            <div className="hero-video">
                <video autoPlay muted loop>
                    <source src={videoSrc} type="video/mp4" />
                </video>
            </div>
        </section>
        <div className="alll-cards">
            {products && products.length > 0 ? (
                products.map((product) => (
                    <div key={product._id} className="food-card">
                        <div className="img-wrapper">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                                onClick={() => handleCategoryClick(product._id)}
                            />
                            <FaHeart
                            className={`favorite-icon ${favorites.includes(product._id) ? 'favorited' : ''}`}
                            onClick={() => toggleFavorite(product._id)}
                            />
                        </div>
                        <div className="details">
                            <h3>{product.name}</h3>
                            <p className="calori">
                                
                                Price: {product.price}JD
                            </p>
                            <div className="time-rating">
                                <p className="timee">
                                    <span className="material-icons red-icon">local_fire_department</span>
                                    {product.calories} cal
                                </p>
                                <p className="ratee">⭐ {product.rating}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No products found for this category.</p>
            )}
        </div>
        {cart && cart.items && cart.items.length > 0 && (
            <CartSummary />
        )}
    </section>
);
};

export default Products;



/*<p className="timee">*/
/*<MdLocalFireDepartment style={{ color: 'red', marginRight: '5px' }} />*/
/*{product.calories} calories*/
/*</p>*/