import React from 'react'
import { useState } from 'react'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import "./forgot.css"
function ForgotPassNewpass() {

  
const {email}=useParams();
  const [newpass,setNewpass]=useState('')
  const [confirmpass,setConfirmpass]=useState('');
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



  const passRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;


const postData = () => {
  // Sending data to the server
  if(!passRegex.test(newpass)){
    notifyError("Password should contain min of 8 digits with atleast 1 uppercase,1 lowercase,1 special character(&,@,#) and 1 numberic character");
    return;
  }
  if(newpass!=confirmpass){
    notifyError("New password and confirm password should match");
    return;
  }

  fetch('/auth/forgot-pass/pass-send', {
    method: "put",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
    email:email,
    newpass:newpass,
    confirmpass:confirmpass
    
    }),
  })
  .then(res => res.json()) 
  .then(data => {
    console.log(data);  // Log the parsed data
    if(data.err){
      notifyError(data.err);
      }
      else {
       
          navigate('/login');
          notifySuccess("Password Updated successfully");
        }
      
  })
  .catch(error => {
    console.error('Error:', error);
  });
};


  return (
    <div  className="forgot-password-box-password">

        <div className="website_name-password">Forgot Password</div>

    <input className="new-pass" placeholder="New Password" type="password" name="new-pass" onChange={(e)=>{
      setNewpass(e.target.value)
    }}></input>
    
    <input className="confirm-pass" placeholder="Confirm Password" type="text" name="confirm-pass" onChange={(e)=>{
      setConfirmpass(e.target.value)
    }}></input>
    
    
<button  type="submit" onClick={postData} className="email_next_btn">Create Password</button>
        
    </div>
  )
}

export default ForgotPassNewpass;