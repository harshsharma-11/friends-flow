import React from 'react'
import '../profile.css'
import '../sidebar.css'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function UserProfile() {
    
  const { userId } = useParams();
const navigate=useNavigate();
 
const token=localStorage.getItem("jwt");
const currUserId=JSON.parse(localStorage.getItem('user'))._id;
    useEffect(()=>{
      if(!token){
          navigate('/login');
      }
      else if(userId==currUserId){
        navigate('/profile');
      }
      
      },[])
      let username;
      if(token){
username=JSON.parse(localStorage.getItem('user')).username;
      }
 
  const [modal_show,setModal_show]=useState(false);
  const handleLogout=()=>{
setModal_show(true);
console.log('kkkk');
  }
  const LogoutUser=()=>{
    localStorage.clear();
    navigate('/login');
  }



  /************************************************* */
  const [posts,setPosts]=useState([]);
  const [user,setUser]=useState({});
  
  const [totalfollowing,setTotalFollowing]=useState('0');
  const [totalfollowers,setTotalFollowers]=useState('0');
  const [followers,setFollowers]=useState([]);
  const [following,setFollowing]=useState([]);
  const [isfollowed,setisFollowed]=useState(false);
  console.log(userId);
  
  useEffect(()=>{
  
    fetch(`/user/${userId}`,{
  
    method:'get',
    headers:{
  "Authorization":"Bearer "+localStorage.getItem('jwt')},
  
  
  }).then(res=>res.json())
  .then(data=>{setPosts(data.post);
    setUser(data.user);
    setFollowers(data.user.followers);
    setFollowing(data.user.following);
    setTotalFollowing(data.user.following.length);
    setTotalFollowers(data.user.followers.length);
    if(data.user.followers.includes(currUserId)){
      console.log('yes');
      setisFollowed(true);
    }
    console.log(data.user);
      console.log('called');
  console.log(posts);})
  .catch(err=>console.log(err));
  }
     
  ,[])


  const followUser=(userId)=>{
    console.log(userId);
    fetch('/user/follow',{
  
    method:'put',
    headers:{
      
      "Content-Type":'Application/json',
  "Authorization":"Bearer "+localStorage.getItem('jwt')},
  
  body:JSON.stringify({
    followId:userId,
  })
  }).then(res=>res.json())
  .then(data=>{console.log(data);
    setisFollowed(true);
    
    setTotalFollowers(totalfollowers+1);
  })
  .catch(err=>console.log(err));
  }


  const unfollowUser=(userId)=>{
    fetch('/user/unfollow',{
  
    method:'put',
    headers:{
      
      "Content-Type":'Application/json',
  "Authorization":"Bearer "+localStorage.getItem('jwt')},
  
 
  body:JSON.stringify({
    unfollowId:userId,
   
    })
  }).then(res=>res.json())
  .then(data=>{console.log(data);
    setisFollowed(false);
  
    setTotalFollowers(totalfollowers-1);})
  .catch(err=>console.log(err));
  }
  return (
    <>
    
    <div className="profile">
        <div className="profile_sidebar" >
        <div className="profile_about">
            <img src={user.profile_pic} alt="profile"></img>
            <div className="profile-name">{user.username}</div>
            
            </div>
            <div className="profile_network">
                <div>
                <span>Posts</span> 
                <span className="profile_number">{posts.length}</span>
                </div>
                <div>
                <span>Followers</span>
                <span className="profile_number">{totalfollowers}</span>
                </div>
                <div>
                <span>Following</span>
                <span className="profile_number">{totalfollowing}</span>
                 </div>
            
                 
           
           </div>
           <div className="profile_btn">
            {isfollowed?(<div onClick={()=>{
              unfollowUser(userId);
            }} className="follow-btn">Unfollow </div>):(<div onClick={()=>{
              followUser(userId);
            }} className="follow-btn">Follow </div>)}
            
            </div>
       
        </div>

<div className='profile_body'><div className="myposts-title">Posts</div>
    <div className="myposts-container">
      
    {posts.map((post,index)=>
    (
        <div className="profile_posts">

          
    
          <img className="postprofile-img" src={post.photo}></img></div>
        )
        )}
        </div></div>

    </div>
    </>
  )
}

export default UserProfile