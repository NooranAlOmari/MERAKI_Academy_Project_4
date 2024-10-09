import React, {useContext,useEffect,useState} from 'react'
import {AppContext} from '../../App'
import axios from "axios"
import {useNavigate } from "react-router-dom";
import './Login.css';

const Login=()=>{

    const navigate = useNavigate();

    const{
        setToken,
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
                navigate("/articles")
            })
            .catch((err) => {
                console.log(err);
                setMessage(err.response.data.message)
            });
    }


return (

<div className="login-container">

    <nav>
        <p className="nav" onClick={() => navigate("/")}>Register</p>
        <p className="nav" onClick={() => navigate("/users/login")}>Login</p>
    </nav>

<div className="form-container">
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
>Login</button>


 {message && <div>{message}</div>}

 </div>
</div>
  )
}

export default Login