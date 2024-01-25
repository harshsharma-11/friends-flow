import React from 'react'
import { useState } from 'react'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import "./login.css"
function Login() {

  

  const [user,setUser]=useState({
    
    email:"",
    password:"",
    })
const navigate=useNavigate();
    
const notifyError = (msg) => toast.error(msg);
const notifySuccess = (msg) => toast.success(msg);
const notifyWarning=(msg)=>{
  toast.warning(msg);
}

const token=localStorage.getItem("jwt");
  if(token){
      navigate('/');
  }

const handle_signup=()=>{

  navigate('/signup');
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

  fetch('/auth/signin', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
      email:user.email,
      password:user.password,
    }),
  })
  .then(res => res.json())  // Parse the JSON response
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
          
    localStorage.setItem('jwt',data.token);
    localStorage.setItem('user',JSON.stringify(data.user));
    
    
          navigate('/');
          console.log(data);
          notifySuccess("Logged In successfully");
        }
      }
  })
  .catch(error => {
    console.error('Error:', error);
  });
};



const handleGoogleAuth=()=>{
console.log('google auht');
  fetch('/auth/google')
  .then(res => res.json())  // Parse the JSON response
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
          
    localStorage.setItem('jwt',data.token);
    localStorage.setItem('user',JSON.stringify(data.user));
    
    
          navigate('/');
          console.log(data);
          notifySuccess("Logged In successfully");
        }
      }
  })
  .catch(error => {
    console.error('Error:', error);
  });

}


  return (
    <div  className="login">

        <div className="website_name">FriendsFlow</div>
<div className="login_title">Sign in to FriendsFlow</div>

<div className="login_other_methods">
<button className="google_login" onClick={handleGoogleAuth}><img alt="google" src="https://cdn-icons-png.flaticon.com/128/281/281764.png"></img><span> Sign in with Google</span></button>
<button className="facebook_login"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="facebook"></img><span> Sign in with Facebook</span></button>
</div>

<div className="email_login">
    {/* <p>---------------------------  or  ----------------------------</p> */}
    <input className="email_box" placeholder="Enter Email" type="email" name="email" onChange={(e)=>{
      setUser({...user,email:e.target.value})
    }}></input>
    
    <input className="email_box_password" placeholder="Password" type="password" name="password" onChange={(e)=>{
      setUser({...user,password:e.target.value})
    }}></input>
<button type="submit" onClick={postData} className="email_next_button">SignIn</button>
<button className="forgot_password_button">Forgot password?</button>

</div>

<div onClick={handle_signup} className="no_account">Don't have an Account? Sign up</div>
        
    </div>
  )
}

export default Login;