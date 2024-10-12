import React, {useContext,useEffect,useState} from 'react'
import {AppContext} from '../../App'
import {useNavigate } from "react-router-dom";
import axios from "axios"
import './Category.css'
const Category = () => {
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    

    const{
        setToken,
        categories, setCategories,
        selectedCategoryId, setSelectedCategoryId
        }= useContext(AppContext);

    
    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            
            .then((response) => {
                setCategories(response.data.categories);
                setMessage(response.data.message);
            })
            .catch((error) => {
            console.log('Error fetching categories:', error);
            });
    }, []);


    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
        navigate(`/products/${categoryId}`); //
    }


    return (   
        <div>
            <h2>Food Categories</h2>
            
            <div className="categories-container">
                {categories.map((category) => (
                    <div key={category._id} className="category-card">
                    <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                    onClick={() => handleCategoryClick(category._id)} 
                    />
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                    </div>
                ))}
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}
export default Category;
