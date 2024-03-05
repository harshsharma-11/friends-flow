import React from 'react'
import { useState } from 'react'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import friends from '../assets/friend.jpg'
import { useEffect } from 'react';

import './login.css'
import './authemail.css'
import './forgot.css'
function ForgotPassEmail() {

  

  const [email,setEmail]=useState('')
const navigate=useNavigate();
    
const notifyError = (msg) => toast.error(msg);
const notifySuccess = (msg) => toast.success(msg);
const notifyWarning=(msg)=>{
  toast.warning(msg);
}

const token=localStorage.getItem("jwt");

  
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []); // Make sure to include the dependency array


const emailRegex=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;





const postData = () => {
  // Sending data to the server
  if(!emailRegex.test(email)){
    notifyError("Not a valid email");
    return;
  }

  fetch('/auth/forgot-pass/email-send', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
      email:email
    }),
  })
  .then(res => res.json()) 
  .then(data => {
    console.log(data);  // Log the parsed data
    if(data.error){
      notifyError(data.error);
      }
      else {
        if(data.message){
      notifyWarning(data.message);
        }
        else{
          navigate(`/forgot-pass-otp/${email}`);
          notifySuccess("Otp send successfully");
        }
      }
  })
  .catch(error => {
    console.error('Error:', error);
  });
};


  return (
    
    <div  className="login auth-email forgot">
          <div className="login-left"><img src={friends}></img></div>

          <div className="login-right">
        <div className="website_name">FriendsFlow</div>

        <div className="login_title ">Forgot Password</div>
        <div className="signup-email_signup">

    <input className="signup-email_box" placeholder="Enter Email" type="email" name="email" onChange={(e)=>{
      setEmail(e.target.value)
    }}></input>
    
    
<button  type="submit" onClick={postData} className="signup-email_next_button">Send Otp</button>
        
    </div>
    </div>
</div>

        
  
  )
}

export default ForgotPassEmail;