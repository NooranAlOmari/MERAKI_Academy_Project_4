import React, {useContext,useEffect,useState} from 'react'
import {AppContext} from '../../../App'
import {useNavigate } from "react-router-dom";
import axios from "axios"
import Category from '../../Category/Category';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function CategoryManage() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [showInputs, setShowInputs] = useState(false);

    const [image, setImage] = useState(""); //To save the link of the uploaded image
    const [uploading, setUploading] = useState(false);
    const{
        token,
        setToken,
        categories, setCategories
        }= useContext(AppContext);


// Function to upload image to Cloudinary
    const uploadImageToCloudinary = (file) => {
        setUploading(true); 
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "my_upload_preset-nooran"); 
        data.append("cloud_name", "drw9jdfsu"); 

        fetch("https://api.cloudinary.com/v1_1/drw9jdfsu/image/upload", {
            method: "post",
            body: data
        })
        .then(resp => resp.json())
        .then(data => {
            setImage(data.url); // Save the uploaded image link in the image variable
            setUploading(false); 
        })
        .catch(err => {
            console.log(err);
            setUploading(false); // Stop uploading even if an error occurs
        });
    };



    
        const AddCategory  = () => {
            axios
            .post("http://localhost:5000/categories",
                { name , description ,image},//image Using the uploaded image link.
                {headers:{Authorization:`Bearer ${token}`}}
            )
            .then((result) => {
                toast.success(result.data.message);               
                setName("");
                setDescription("");
                setImage("");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
        }
        



return (
<>
        <div className="add-category-form slide-up-animation">
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
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadImageToCloudinary(e.target.files[0])}
                        className="input-field"
                    />
                    {uploading ? <p>Uploading...</p> : null}
                    {image && (
                    <div style={{ marginTop: '10px' }}>
                    <img src={image} alt="Uploaded" style={{ width: '100px', height: 'auto', border: '1px solid #ccc', borderRadius: '5px' }} />
                    <p style={{ fontSize: '12px', color: '#555' }}>Image uploaded successfully!</p>
            </div>
)}

                    <button className='slide-up-animation' onClick={AddCategory} disabled={uploading || !image}>
                            {uploading ? "Uploading Image..." : "Add Category"}
                        </button>
                </>
            )}

            
        </div>


</>        
    );
}

        

export default CategoryManage

