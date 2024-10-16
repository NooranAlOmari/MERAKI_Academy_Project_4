import React, {useContext,useEffect,useState} from 'react'
import {AppContext} from '../../App'
import axios from "axios"
import {useNavigate } from "react-router-dom";
import './Login.css';

const LogIn =()=>{

    const navigate = useNavigate();

    const{
        setToken,
        isAdmin, setisAdmin,
        isLoggedIn , setIsLoggedIn,
        }= useContext(AppContext);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState
    ('');
    const [message, setMessage] = useState('');


    const handleLogin = ()=> {
        axios
            .post("http://localhost:5000/users/login",{
                email, 
                password
            })
            .then((res) => {
                console.log(res);

                setToken(res.data.token)
                localStorage.setItem('token',res.data.token)

                /**/const isAdmin = res.data.isAdmin;
                console.log(isAdmin)
                setisAdmin(isAdmin)
                localStorage.setItem('isAdmin', isAdmin);
                
                if (isAdmin) {
                    navigate("/adminPanel");
                } else {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
                setMessage(err.response.data.message)
            });
    }


return (
<>
<div className="form-container sign-in-container">

<form >

<h1>Sign in</h1>
<p>Already have an account? sign in here!</p>

        <div className="social-container">
            <a href="#" className="social">
                <i className="fab fa-facebook-f" />
            </a>
            <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
            </a>
            <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
            </a>
        </div>
    <span>or use your account</span>

<input
type='email'
 placeholder='Email'
onChange={(e)=>{setEmail(e.target.value)}}
className="input-field"
></input>

<input
type='password'
 placeholder='Password'
onChange={(e)=>{setPassword(e.target.value)}}
className="input-field"
></input>

<button
 onClick={handleLogin}
>Sign in</button>


 {message && <div className='message'>{message}</div>}


 </form >
 
</div>

</>
  )
}

export default LogIn