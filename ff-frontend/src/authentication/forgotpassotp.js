import React from 'react'
import { useState } from 'react'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react';

import "./forgot.css"
function ForgotPassOtp() {

  const {email}=useParams();

  const [otp,setOtp]=useState('')
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



const postData = () => {
  // Sending data to the server
  

  fetch('/auth/forgot-pass/otp-send', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      otp:otp,
      email:email
     
    }),
  })
  .then(res => res.json()) 
  .then(data => {
    console.log(data);  // Log the parsed data
    if(data.err){
      notifyError(data.err);
      }
      else {
          navigate(`/forgot-pass-newpass/${email}`);
          notifySuccess("Otp Validated successfully");
        
      }
  })
  .catch(error => {
    console.error('Error:', error);
  });
};


  return (
    <div  className="forgot-password-box">

        <div className="forgot-website_name">FriendsFlow</div>

    <input className="forgot-email_box" placeholder="Enter Otp" type="number" name="otp" onChange={(e)=>{
      setOtp(e.target.value)
    }}></input>
    
    
    
<button  type="submit" onClick={postData} className="forgot-email_next_button">Submit Otp</button>
        
    </div>
  )
}

export default ForgotPassOtp;