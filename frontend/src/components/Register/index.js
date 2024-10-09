import React, {useContext,useEffect,useState} from 'react'
import {AppContext} from '../../App'
import {useNavigate } from "react-router-dom";
import axios from "axios"
import './register.css';

const Register = () => {

   const navigate = useNavigate();


   const{
       }= useContext(AppContext);


   const[firstName,setfirstName]=useState("")
   const[lastName,setlastName]=useState()
   const[age,setage]=useState()
   const[country  ,setcountry]=useState()
   const[email,setemail]=useState()
   const[password ,setpassword ]=useState()
   const [message, setMessage] = useState('');

   const handleRegister = ()=> {

       axios.post("http://localhost:5000/users/register",{
               firstName,
               lastName,
               age,
               country,
               email,
               password,
               role:"67007c95b2e85f1f89763cbc",
               })
           .then((res) => {
               console.log(res);
               setLoading(false);
               setMessage(res.data.message)
               navigate("/users/login")

           })
           .catch((err) => {
               console.log(err);
               setMessage(err.response.data.message)
           });
   }



 return (

<div className="register-container">


  <nav>
<p onClick={()=>{navigate("/")}}className="nav">
Register
</p>

<p onClick={()=>{navigate("/users/login")}}className="nav">
Login
</p>
  </nav>


  <div className="form-container">
<input
type='text'
placeholder='First Name'
onChange={(e)=>{setfirstName(e.target.value)}}
className="input-field"
></input>

<input
type='text'
placeholder=' Last Name'
onChange={(e)=>{setlastName(e.target.value)}}
className="input-field"
></input>

<input
type='number'
placeholder='Age'
onChange={(e)=>{setage(e.target.value)}}
className="input-field"
></input>

<input
type='text'
placeholder='Country'
onChange={(e)=>{setcountry(e.target.value)}}
className="input-field"
></input>

<input
type='email'
placeholder='Email'
onChange={(e)=>{setemail(e.target.value)}}
className="input-field"
></input>

<input
type='password'
placeholder='Password'
onChange={(e)=>{setpassword(e.target.value)}}
className="input-field"
></input>

<button
onClick={handleRegister}
>Register</button>

{loading && <div className="loading">Loading....</div>}

{message && <div className="message">{message}</div>}

  </div>


</div>
)
}

export default Register