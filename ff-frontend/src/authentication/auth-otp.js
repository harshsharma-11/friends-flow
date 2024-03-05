import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import "./authemail.css"
import "./login.css"
import friends from '../assets/friend.jpg'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function AuthOtp() {
const [otp,setOtp]=useState('')
const navigate=useNavigate();


const token=localStorage.getItem("jwt");
  useEffect(() => {

    if (token) {
      navigate('/');
    }
    
  }, []); // Make sure to include the dependency array

const handlelogin=()=>{
  navigate('/login');
}

const notifyError = (msg) => toast.error(msg);
const notifySuccess = (msg) => toast.success(msg);
const notifyWarning=(msg)=>{
  toast.warning(msg);
}
 const {email}=useParams();

const postData = () => {
      // Sending data to the server
  

  fetch('/auth/signup/otp-send', {
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
          navigate(`/signup-details/${email}`);
          notifySuccess("Otp Validated successfully");
        
      }
  })
  .catch(error => {
    console.error('Error:', error);
  });
};


  
  
  return (
    <div  className="login auth-otp">
      <div className="login-left"><img src={friends}></img></div>

<div className="login-right">

        <div className="website_name">FriendsFlow</div>
<div className="login_title">Sign up to FriendsFlow</div>
<div className="signup-email_signup">
    <input className="signup-email_box" placeholder="Enter Otp" type="number" name="otp" onChange={(e)=>{
      setOtp(e.target.value)
    }}></input>
    
  
<button type="submit" onClick={postData} className="signup-email_next_button">Submit Otp</button>

</div>

<div onClick={handlelogin} className="no_account">Have an account already ? Login</div>
</div>
    </div>
  )
}

export default AuthOtp;