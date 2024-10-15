import React, {useContext,useEffect,useState} from 'react'
import {AppContext} from '../../App'
import {useNavigate } from "react-router-dom";
import axios from "axios"
import Category from '../Category/Category';
import './Home.css';

import { ToastContainer, toast } from 'react-toastify';/* */
import 'react-toastify/dist/ReactToastify.css';/* */


function Home() {

  const navigate = useNavigate();


  const [searchInput, setSearchInput] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const{
  products, setProducts
    }= useContext(AppContext);

    const handleSearch = async () => {
// If the search box is empty
      if (searchInput === '') {
        toast.error('Please enter a search term.');
        setProducts([]); 
        return;
      }
    
      try {
        const response = await axios.get(`http://localhost:5000/products/search/${searchInput}`);
    
        if (response.data.success && response.data.products.length > 0) {
          setProducts(response.data.products); 
          toast.success('Products found!');
          navigate('/products/search');/****/
        } else {
          setProducts([]); 
          toast.info('No products found matching your search.');
        }
      } catch (err) {
        console.log(err);
        toast.info('No products found matching your search.');
        setProducts([]);
      }
    };
    
  return (
    <>
        <ToastContainer />

      <header className="home-header">

        <video autoPlay muted loop className="header-background">
          <source src="/home-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="header-content">
          <h1>What will you eat today?</h1>
          <div className="search-bar">
              <input id="searchInput" placeholder="Search for a recipe..." onChange={(e)=>{setSearchInput(e.target.value)}}/>
              <button id="searchButton" onClick={()=>{handleSearch()}}>Search</button>
          </div>
          {message && <p className="search-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </header>
      
      <Category />
      
    </>
  );
}

export default Home;
