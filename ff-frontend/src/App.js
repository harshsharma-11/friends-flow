import React from "react"
import "./App.css"
import Profile from "./profile/profile"
import Home from "./homepage"
import Signup from "./authentication/signup"
import Login from "./authentication/login"
import { BrowserRouter, Routes, redirect, Route } from 'react-router-dom';
import Navbar from "./navigation/navbar";
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from "./timeline/posts/create-post"
import UserProfile from "./profile/user-profile/user-profile"
import ForgotPassEmail from "./authentication/forgotpassemail"
import ForgotPassNewpass from "./authentication/forgotpass-newpass"
import ForgotPassOtp from "./authentication/forgotpassotp"
import AuthEmail from "./authentication/authemail"
import AuthOtp from "./authentication/auth-otp"

function App() {

  //hide navbar from login and signup page

  const [showNavbar, setShowNavbar] = useState(true);
  useEffect(() => {
    const currentPath = window.location.pathname;
    console.log(currentPath);
    setShowNavbar(currentPath !== '/signup' && currentPath !== '/login');
  }, []);
  /********************* */
  return (<BrowserRouter>
    <Navbar />


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<AuthEmail />} />
      <Route path="/signup-details/:email" element={<Signup />} />
      <Route path="/signup-otp/:email" element={<AuthOtp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-pass-email" element={<ForgotPassEmail />} />
      <Route path="/forgot-pass-newpass/:email" element={<ForgotPassNewpass />} />
      <Route path="/forgot-pass-otp/:email" element={<ForgotPassOtp />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/create-post" element={<CreatePost/>}/>
      <Route path="/user-profile/:userId" element={<UserProfile/>}/>
    </Routes>
    <ToastContainer position="top-right"
      autoClose={2001}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" />
  </BrowserRouter>

  );
}

export default App;

//harshsharma90153
//d9o63WJLIo6R2q9M