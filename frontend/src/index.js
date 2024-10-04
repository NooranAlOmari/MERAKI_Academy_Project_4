import React from "react";
import ReactDOM from "react-dom/client"; //1. this one works
// import { createRoot } from "react-dom/client"; //2. this one works

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById("root")); // 1
//2. const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Router>
  
        <App />
   
    </Router>
  </StrictMode>
);