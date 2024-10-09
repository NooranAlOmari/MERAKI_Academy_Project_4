import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            
            .then((response) => {
                setCategories(response.data.categories);
            })
            .catch((error) => {
            console.error('Error fetching categories:', error);
            });
    }, []);

    return (   
        <div>
            <h2>Food Categories</h2>
            
            <div className="categories-container">
                {categories.map((category) => (
                    <div key={category._id} className="category-card">
                        <img src={category.image} alt={category.name} className="category-image" />
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                    </div>
                ))}
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Category;
