import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import "./signup.css"
import { useNavigate } from 'react-router-dom';
function Signup() {
const [user,setUser]=useState({
username:"",
email:"",
password:"",
})
const navigate=useNavigate();


const token=localStorage.getItem("jwt");
  if(token){
      navigate('/');
  }

const handlelogin=()=>{
  navigate('/login');
}

const notifyError = (msg) => toast.error(msg);
const notifySuccess = (msg) => toast.success(msg);
const notifyWarning=(msg)=>{
  toast.warning(msg);
}



const emailRegex=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const postData = () => {
  // Sending data to the server


if(!emailRegex.test(user.email)){
  notifyError("Not a valid email");
  return;
}
else if(!passRegex.test(user.password)){
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
      email:user.email,
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
    <div  className="signup">

        <div className="signup_website_name">FriendsFlow</div>
<div className="signup_title">Sign up to FriendsFlow</div>

<div className="signup_other_methods">
{/* <button className="google_login"><img alt="google" src="https://cdn-icons-png.flaticon.com/128/281/281764.png"></img><span> Sign up with Google</span></button> */}
{/* <button className="facebook_login"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="facebook"></img><span> Sign up with Facebook</span></button> */}
</div>

<div className="email_signup">
    {/* <p>---------------------------  or  ----------------------------</p> */}
    <input className="signup_email_box" placeholder="Email" type="email" name="email" onChange={(e)=>{
      setUser({...user,email:e.target.value})
    }}></input>
    
    <input className="signup_email_box_password" placeholder="Username" type="text"  name="username"  onChange={(e)=>{
      setUser({...user,username:e.target.value})
    }}></input>
    <input className="email_box_confirm_password" placeholder=" Password" type="password" name="password" onChange={(e)=>{
      setUser({...user,password:e.target.value})
    }}></input>
<button type="submit" onClick={postData}className="signup_email_next_button">SignUp</button>

</div>

<div onClick={handlelogin} className="no_account">Have an account already ? Login</div>
        
    </div>
  )
}

export default Signup;