import React from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router-dom'
import brand from "./mybrand.webp"
function Navbar() {

  const token=localStorage.getItem('jwt');
  const navigate=useNavigate();
  const handle_login=()=>{
    
        navigate('/login');
  }
  const handle_signup=()=>{
    
        navigate('/signup');
  }
  const handle_home=()=>{
    
        navigate('/');
  }
  const handle_profile=()=>{
  
        navigate('/profile');
  }
  const handle_create=()=>{
    
        navigate('/create-post');
  }
  const handle_search=()=>{
    
        navigate('/search');
  }
  const handle_message=()=>{
    
        navigate('/messages');
  }
  return (
    <div className="Navbar">
      
      <div className="navbar-left">
        <div className="nav-img" onClick={handle_home}><img src="https://cdn-icons-png.flaticon.com/128/10748/10748319.png"></img></div>
    <div className="nav-heading"><h1 onClick={handle_home}>FriendFlow</h1></div>
    </div>
  {token? ( 
    <div className="navbar-right">
<div onClick={handle_home} className="home_icon"><img alt="home"src="https://cdn-icons-png.flaticon.com/128/9434/9434524.png"></img><span>Home</span></div>
<div onClick={handle_create} className="create-post_icon"><img alt="reels" src="https://cdn-icons-png.flaticon.com/128/10025/10025341.png"></img><span>Create Post</span></div>
{/* <div onClick={handle_search} className="search_icon"><img alt="search" src="https://cdn-icons-png.flaticon.com/128/10947/10947920.png"></img><span>Search</span></div> */}
<div onClick={handle_profile} className="setting_icon"><img alt="settings" src="https://cdn-icons-png.flaticon.com/128/9069/9069049.png"></img><span>Profile</span></div>
{/* <div onClick={handle_message} className="message_icon"><img alt="messages" src="https://cdn-icons-png.flaticon.com/128/1409/1409939.png"></img><span>Messages</span></div> */}
</div> ):
  (
    <div className="navbar-right">
    <div onClick={handle_login} className="home_icon"><img alt="login"src="https://cdn-icons-png.flaticon.com/128/11850/11850904.png"></img><span>Login</span></div>
<div onClick={handle_signup} className="create-post_icon"><img alt="signup" src="https://cdn-icons-png.flaticon.com/128/9068/9068668.png"></img><span>Signup</span></div>
</div>
  )}
    
     </div>
    
  )
}

export default Navbar