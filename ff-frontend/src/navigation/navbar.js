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
        <div className="nav-img" onClick={handle_home}><img src="https://cdn-icons-png.flaticon.com/128/10/10718.png"></img></div>
    <div className="nav-heading"><h1 onClick={handle_home}>FriendsFlow</h1></div>
    </div>
  {token? ( 
    <div className="navbar-right">
<div onClick={handle_home} className="home_icon"><img alt="home"src="https://cdn-icons-png.flaticon.com/128/861/861435.png"></img><div className='nav-icon-name'>Home</div></div>
<div onClick={handle_create} className="create-post_icon"><img alt="reels" src="https://cdn-icons-png.flaticon.com/128/4511/4511814.png"></img><div className='nav-icon-name'>Create Post</div></div>
{/* <div onClick={handle_search} className="search_icon"><img alt="search" src="https://cdn-icons-png.flaticon.com/128/10947/10947920.png"></img><span>Search</span></div> */}
<div onClick={handle_profile} className="setting_icon"><img alt="settings" src="https://cdn-icons-png.flaticon.com/128/7710/7710521.png"></img><div className='nav-icon-name'>Profile</div></div>
{/* <div onClick={handle_message} className="message_icon"><img alt="messages" src="https://cdn-icons-png.flaticon.com/128/1409/1409939.png"></img><span>Messages</span></div> */}
</div> ):
  (
    <div className="navbar-right">
    <div onClick={handle_login} className="home_icon"><img alt="login"src="https://cdn-icons-png.flaticon.com/128/4844/4844163.png"></img>< div className='nav-icon-name'>Login</div></div>
<div onClick={handle_signup} className="create-post_icon"><img alt="signup" src="https://cdn-icons-png.flaticon.com/128/13079/13079071.png"></img><div className='nav-icon-name'>Signup</div></div>
</div>
  )}
    
     </div>
    
  )
}

export default Navbar