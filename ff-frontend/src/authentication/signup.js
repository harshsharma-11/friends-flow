import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import "./login.css"

import "./signup.css"
import friends from '../assets/friend.jpg'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function Signup() {
const [user,setUser]=useState({
username:"",
password:"",
})
const navigate=useNavigate();


const token=localStorage.getItem("jwt");
  // if(token){
  //     navigate('/');
  // }
  
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


const passRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const {email}=useParams();
const postData = () => {

 if(!passRegex.test(user.password)){
  notifyWarning("Password should contain min of 8 digits with atleast 1 uppercase,1 lowercase,1 special character(&,@,#) and 1 numberic character");
  return;
}
  fetch('/auth/signup', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username:user.username,
      email:email,
      password:user.password,
    }),
  })
  .then(res => res.json())  // Parse the JSON response
  .then(data => {
    
if(data.error){
notifyError(data.error);
}
else {
  
  if(data.message){
notifyWarning(data.message);
  }
  else{
    notifySuccess("Logged In successfully");
    localStorage.setItem('jwt',data.token);
    
    localStorage.setItem('user',JSON.stringify(data.user));
    navigate('/');
   
  }
}
    console.log(data);  // Log the parsed data
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

  return (
    
    <div  className="login signup">
      <div className="login-left"><img src={friends}></img></div>
    <div  className="login-right">

        <div className="website_name">FriendsFlow</div>
<div className="login_title">Sign up to FriendsFlow</div>


<div className="email_login">
    
    
    <input className="email_box signup_email-box" placeholder="Username" type="text"  name="username"  onChange={(e)=>{
      setUser({...user,username:e.target.value})
    }}></input>
    <input className="email_box signup_email-box" placeholder=" Password" type="password" name="password" onChange={(e)=>{
      setUser({...user,password:e.target.value})
    }}></input>
<button type="submit" onClick={postData}className="email_next_button">SignUp</button>

</div>

<div onClick={handlelogin} className="no_account">Have an account already ? Login</div>
        
    </div>
    </div>
  )
}

export default Signup;