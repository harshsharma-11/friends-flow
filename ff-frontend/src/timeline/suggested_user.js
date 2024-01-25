import React from 'react'
import "./suggested_user.css"
import { useNavigate } from 'react-router-dom';
function Suggested_user(props) {
    const {username,profimage,userId}=props;

    const navigate=useNavigate();
  const handleProfileClick=(userId)=>{
    navigate(`/user-profile/${userId}`);
  }
  return (
    <div className="suggested_user">
  <div className="suggestion_left">
  <img  onClick={()=>{
              handleProfileClick(userId)} } alt="user_name" className="suggested_user_profile" src={profimage}></img>
  
  </div>
  <div className="suggestion_right">
  <span onClick={()=>{
              handleProfileClick(userId)} }  id="suggested_user_name">{username}</span>
  </div>
  </div>
  )
}

export default Suggested_user