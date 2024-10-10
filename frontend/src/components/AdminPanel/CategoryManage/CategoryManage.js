import React, {useContext,useEffect,useState} from 'react'
import {AppContext} from '../../../App'
import {useNavigate } from "react-router-dom";
import axios from "axios"
//import './CategoryManage.css';
import Category from '../../Category/Category';

function CategoryManage() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [showInputs, setShowInputs] = useState(false);

    const{
        token,
        setToken,
        categories, setCategories
        }= useContext(AppContext);

    
        const AddCategory  = () => {
            axios
            .post("http://localhost:5000/categories",
                { name , description ,image},
                {headers:{Authorization:`Bearer ${token}`}}
            )
            .then((result) => {
                setMessage(result.data.message);
                setName("");
                setDescription("");
                setImage("");
            })
            .catch((error) => {
                setMessage(error.response.data.message);
            });
        }
        

        
return (
<>
        <div className="add-category-form">
            <button onClick={() => setShowInputs(!showInputs)}>
                {showInputs ? 'Cancel' : 'Add New Category'} 
            </button>

            {showInputs && ( 
                <>
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
        
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                    ></textarea>
        
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="input-field"
                    />
        
                    <button onClick={AddCategory}>Add Category</button>
                </>
            )}

            {message && <div className="message">{message}</div>}
        </div>
                                                          

</>        
    );
}

        

export default CategoryManage

