import React from 'react'
import "./App.css";
import { useState, createContext } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";

import AdminPanel from './components/AdminPanel/AdminPanel';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home/Home'
import AuthPage from './components/AuthPage/AuthPage';
import Products from './components//Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartPage from './components/Cart/CartPage';
import Footer from './components/Footer/Footer';
import Favorites from './components/Favoritess/Favoritess';

export const AppContext = createContext();
const App = () => {
  
  
  const [token, setToken] = useState(localStorage.getItem('token')||'')
  const [categories, setCategories] = useState([]);
  const [isLoggedIn , setIsLoggedIn ] = useState(false)
  const [isAdmin, setisAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([])
  const [selectedproductId, setselectedproductId] = useState(null);
  const [cart, setupdateCart] = useState();
  const [favorites, setFavorites] = useState([]);
  const [quantity, setQuantity] = useState(1);


  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  return (

<AppContext.Provider value=
    {{
    token, setToken,
    categories, setCategories,
    isLoggedIn , setIsLoggedIn,
    isAdmin, setisAdmin,
    selectedCategoryId, setSelectedCategoryId,
    products, setProducts,
    selectedproductId, setselectedproductId,
    cart, setupdateCart,
    favorites, setFavorites,
    quantity, setQuantity,
    increaseQuantity, decreaseQuantity,
    
    }}>
    
    <Navbar/>
    
    <div className="App">
    <header className="App-header">
    </header>
    
    </div>



   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/adminPanel" element={<AdminPanel/>} />
    <Route path="/AuthPage" element={<AuthPage/>} />
    <Route path="/products/:categoryId" element={<Products />} />
    <Route path="/products/details/:productId" element={<ProductDetails />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/Favorites" element={<Favorites />} />
    </Routes>
    
    <Footer/>

</AppContext.Provider>
  

  )
}
////AuthPage  



export default App;
   //<Route path="/" element={<Register/>} />