import React, { useState } from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router-dom'
import logo from "../assets/friends.jpg"
<style>
@import url('https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap')
</style>
function Navbar() {
const [home_curr,setHome]=useState(true);
const [signup_curr,setSignup]=useState(false);
const [login_curr,setLogin]=useState(true);
const [profile_curr,setProfile]=useState(false);
const [create_curr,setCreate]=useState(false);

  const token=localStorage.getItem('jwt');
  const navigate=useNavigate();
  const handle_login=()=>{
    setLogin(true);
    setSignup(false);
        navigate('/login');
  }
  const handle_signup=()=>{
    setLogin(false);
    setSignup(true);
        navigate('/signup');
  }
  const handle_home=()=>{
    setHome(true);
    setCreate(false);
    setProfile(false);
        navigate('/');
  }
  const handle_profile=()=>{
  setProfile(true);
  setHome(false);
  setCreate(false);
        navigate('/profile');
  }
  const handle_create=()=>{
    setCreate(true);
    setProfile(false);
  setHome(false);
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
        <div className="nav-img" onClick={handle_home}><img src={logo}></img></div>
    <div className="nav-heading " ><h1 className="kode-mono-div" onClick={handle_home}>FriendsFlow</h1></div>
    </div>
  {token? ( 
    <div className="navbar-right">


      {!home_curr?(<div onClick={handle_home} className="home_icon ">
<img alt="home"src="https://cdn-icons-png.flaticon.com/128/861/861435.png"></img>
      </div> ):(
<div onClick={handle_home} className={`home_icon ${home_curr ? 'active' : ''}`}>
<img alt="home"src="https://cdn-icons-png.flaticon.com/128/9692/9692581.png"></img>
      </div>)}

      <div className="icon-name">
      <div className="home-name">Home </div>
</div>

      


      {!create_curr?(<div onClick={handle_create} className="create-post_icon ">
      <img alt="reels" src="https://cdn-icons-png.flaticon.com/128/4511/4511814.png"></img>
      </div> ):(
<div onClick={handle_create} className={`create-post_icon ${create_curr ? 'active' : ''}`}>
<img alt="reels"src="https://cdn-icons-png.flaticon.com/128/10023/10023858.png"></img>
      </div>)}


      <div className="icon-name">
      <div className="create-name">Create Post </div>
</div>

      {!profile_curr?(<div onClick={handle_profile} className="setting_icon ">
            <img alt="settings" src="https://cdn-icons-png.flaticon.com/128/7710/7710521.png"></img>
      </div> ):(
<div onClick={handle_profile} className={`setting_icon ${profile_curr ? 'active' : ''}`}>
<img alt="settings"src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png"></img>
      </div>)}

      <div className="icon-name">
      <div className="profilee-name">Profile </div>
</div>

</div> ):
  (
    <div className="navbar-right">

      {!login_curr?(<div onClick={handle_login} className="home_icon login_icon ">
<img alt="login"src="https://cdn-icons-png.flaticon.com/128/5509/5509636.png"></img>
      </div> ):(
<div onClick={handle_home} className={`login_icon home_icon ${login_curr ? 'active' : ''}`}>
<img alt="login"src="https://cdn-icons-png.flaticon.com/128/14722/14722706.png"></img>
      </div>)}
      <div className="icon-name">
      <div className="login-name">Login </div>
</div>


      {!signup_curr?(<div onClick={handle_signup} className="signup_icon home_icon ">
<img alt="login"src="https://cdn-icons-png.flaticon.com/128/14441/14441456.png"></img>
      </div> ):(
<div onClick={handle_home} className={`signup_icon home_icon ${signup_curr ? 'active' : ''}`}>
<img alt="login"src="https://cdn-icons-png.flaticon.com/128/9068/9068899.png"></img>
      </div>)}
      <div className="icon-name">
      <div className="signupp-name">Signup</div>
</div>
</div>
  )}
    
     </div>
    
  )
}

export default Navbar