import React, { useContext } from 'react';
import {useNavigate } from "react-router-dom";

import { FaHeart, FaDollarSign } from 'react-icons/fa';
import { AppContext } from '../../App';
import './Favoritess.css' 

const Favorites = () => {
    const navigate = useNavigate();

    const { products, favorites,setFavorites,setselectedproductId  } = useContext(AppContext);

    // If there are no favorites
    if (favorites.length === 0) {
        return <p>No favorites added yet.</p>;
    }

    // if there are products
    if (!products || products.length === 0) {
        return <p>No products available.</p>;
    }

/****/
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


const handleCategoryClick = (productId) => {
    setselectedproductId(productId);
    navigate(`/products/details/${productId}`); //
}

return (
    <div className="favorites-list ">
        <h2 >My Favorite</h2>
        {products
            .filter(product => favorites.includes(product._id)) // Filter favorite items
            .map(product => (
                <div key={product._id} className="food-card all-favorites-cards slide-up-animation">
                    <div className="img-wrapper">
                        <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image" 
                        onClick={() => handleCategoryClick(product._id)}/>
                        <FaHeart
                            className={`favorite-icon ${favorites.includes(product._id) ? 'favorited' : ''}`}
                            onClick={() => toggleFavorite(product._id)} // Heart onclick 
                        />
                    </div>
                    <div className="details">
                        <h3>{product.name}</h3>
                        <p className="calori">
                            <FaDollarSign style={{ color: 'green', marginRight: '0px' }} />
                            Price: ${product.price}
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
            ))}
    </div>
);
};

export default Favorites;