import React, {useContext,useEffect,useState} from 'react'
import {AppContext} from '../../App'
import {useNavigate } from "react-router-dom";
import axios from "axios"
import { GoogleLogin } from '@react-oauth/google';
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  
  const { setToken, setisAdmin } = useContext(AppContext);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    axios.post("http://localhost:5000/users/register", {
      firstName, email, password, role:"67007c95b2e85f1f89763cbc"
    })
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };


  const handleGoogleLogin = (credentialResponse) => {
    const token = credentialResponse.credential;
    axios.post("http://localhost:5000/users/google-login", { idToken: token })
        .then((res) => {
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            const isAdmin = res.data.isAdmin;
            setisAdmin(isAdmin);
            localStorage.setItem('isAdmin', isAdmin);
            navigate(isAdmin ? "/adminPanel" : "/");
        })
        .catch((err) => {
            setMessage(err.response.data.message);
        });
};



  return (
    <div className="form-container sign-up-container">
      <form >
      <h1>Create Account</h1>
      <p>Don't have an account? Create one here!</p>
      
      <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>

           {/*Google Login بدون النص */}
          <div className="google-login-button-wrapper">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={(error) => {
                                    console.error("Login Failed: ", error);
                                }}
                            />
            </div>


          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
      </div>
      <span>or use your email for registration</span>

      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setFirstName(e.target.value)}
        className="input-field"
      />
      
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleRegister}>sign up</button>
      
      {message && <div className="message">{message}</div>}

      </form>
    </div>
  );
};

export default Register