import React, { useState } from "react"; 
import "./AuthPage.css";
import LogIn from '../Login';
import Register from "../Register";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function AuthPage() {
  const [type, setType] = useState("signIn");

  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <GoogleOAuthProvider clientId="815765456706-kngddni8k44ucnp5vcbv5k6r2cdkh3v8.apps.googleusercontent.com"> 
      <div className="AuthPage slide-up-animation">
        <h2>Sign in/up Form</h2>
        <div className={containerClass} id="container">
          <Register />
          <LogIn />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
