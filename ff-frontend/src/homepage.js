import React from 'react'
import './homepage.css'
import Timeline from "./timeline/timeline"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Homepage(){
    const navigate=useNavigate();
    const token=localStorage.getItem("jwt");
    useEffect(() => {
      console.log('hello');
  
      if (!token) {
        navigate('/login');
      }
    }, []); // Make sure to include the dependency array
  
    return (
        <div className="homepage">
        
        <div className="homepage__timeline"><Timeline/></div>
        </div>
            )
}
export default Homepage;