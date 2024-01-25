import React from 'react'
import './homepage.css'
import Timeline from "./timeline/timeline"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Homepage(){
    const navigate=useNavigate();

 useEffect(async()=>{
console.log('helo');

const token = localStorage.getItem('jwt');

if (!token) {
  // Add a small delay to ensure the navigate function is called after the render
  // This is to avoid any potential React state update issues
  await new Promise((resolve) => setTimeout(resolve, 0));
  navigate('/login');
}
}, []);
    return (
        <div className="homepage">
        
        <div className="homepage__timeline"><Timeline/></div>
        </div>
            )
}
export default Homepage;