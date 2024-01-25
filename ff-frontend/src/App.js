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
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
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