import React from 'react'
import './profile.css'
import './sidebar.css'

import "./profile_body.css"
import '../authentication/modal.css'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Profile() {
const navigate=useNavigate();
 


const [profile_pic,setProfilePic]=useState('');
const [username,setUsername]=useState('');
const [userId,setUserId]=useState('');
const token=localStorage.getItem("jwt");
    useEffect(()=>{
      if(!token){
          navigate('/login');
      }
      
      else{
        
setProfilePic(JSON.parse(localStorage.getItem('user')).profile_pic);
setUsername(JSON.parse(localStorage.getItem('user')).username);
setUserId(JSON.parse(localStorage.getItem('user'))._id);

console.log(username);
      }
      },[])
 
  const [modal_show,setModal_show]=useState(false);
  const [profile_pic_update_show,setprofile_pic_update_show]=useState(false);
  

  const handleLogout=()=>{
setModal_show(true);
console.log('kkkk');
  }
  const LogoutUser=()=>{
    localStorage.clear();
    navigate('/login');
  }



  const [image,setImage]=useState("");


  const [body,setBody]=useState("");
  const [url,setUrl]=useState("");

  useEffect(()=>{

    const data=new FormData();
    data.append('file',image);
    data.append('upload_preset','friendsflow');
    data.append('cloud_name','harshcloud11');
    fetch('https://api.cloudinary.com/v1_1/harshcloud11/image/upload',{
      method:'post',
      body:data,
    }).then(res=>res.json())
    .then(data=>setUrl(data.url))
    .catch(err=>console.log(err));

  },[image])
  
  useEffect(()=>{
    console.log(url);
  },[url])

  var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  }


  const postProfile_pic=()=>{
   
    fetch('/user/profile-pic',{
      method:'put',
      headers:{"Content-Type":'application/json',
    "Authorization":"Bearer "+localStorage.getItem('jwt')},
body:JSON.stringify({
  image,profile_pic:url,body
})

    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.message){
      setProfilePic(data.details)
      notifySuccess('Profile pic updated SuccessFully');
      setprofile_pic_update_show(false);
   
      /**************************** */
     
      const user =JSON.parse(localStorage.getItem('user'));
      user.profile_pic =data.details; 
      const updatedUserJSON = JSON.stringify(user);
      localStorage.setItem('user', updatedUserJSON);
    }
  else{
    notifyError(data.error)
  }})
    .catch(err=>console.log(err));
    
  }

  const RemoveProfilepic=()=>{
   
    fetch('/user/remove-profile-pic',{
      method:'put',
      headers:{"Content-Type":'application/json',
    "Authorization":"Bearer "+localStorage.getItem('jwt')},


    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.message){
      setProfilePic(data.details)
      notifySuccess('Profile pic removed SuccessFully');
      setprofile_pic_update_show(false);
      
      /**************************** */
     
      const user =JSON.parse(localStorage.getItem('user'));
      user.profile_pic =data.details; 
      const updatedUserJSON = JSON.stringify(user);
      localStorage.setItem('user', updatedUserJSON);
    }
  else{
    notifyError(data.error)
  }})
    .catch(err=>console.log(err));
    
  }



  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);





  const [posts,setPosts]=useState([]);
const [showDelete, setShowDelete] = useState(Array(posts.length).fill(false));
const [followers,setFollowers]=useState('0');
const [following,setFollowing]=useState('0');



useEffect(()=>{
  console.log(userId);
  fetch(`/user/${userId}`,{

  method:'get',
  headers:{
"Authorization":"Bearer "+localStorage.getItem('jwt')},


}).then(res=>res.json())
.then(data=>{setPosts(data.post);
  
  setFollowers(data.user.followers.length);
  setFollowing(data.user.following.length);
  
    })
.catch(err=>console.log(err));
}
   
,[userId])



const handleDeleteShow = (index) => {
  setShowDelete((prevShowDelete) => {
    const newShowDelete = [...prevShowDelete];
    newShowDelete[index] = !newShowDelete[index];
    return newShowDelete;
  
    
  });
};


const DeletePost=(postId,index)=>{
  fetch(`/post/delete-mypost/${postId}`,{

    method:'delete',
    headers:{
  "Authorization":"Bearer "+localStorage.getItem('jwt')},
  
  
  }).then(res=>res.json())
  .then(result=>{
    console.log(result);
    // Update the state after successful deletion
    const updatedPostsCopy = [...posts];
  
    updatedPostsCopy.splice(index, 1);
    setPosts(updatedPostsCopy);
    setShowDelete(Array(updatedPostsCopy.length).fill(false));})

  .catch(err=>console.log(err));
  }
  return (
    <>
    {modal_show?(<div className="modal-show"><div className="modal-container">
        <div className="modal-cut" onClick={()=>{setModal_show(false)}}><img src="https://cdn-icons-png.flaticon.com/128/10165/10165395.png"></img></div>
        <div className="modal-header">Are you sure you want to LogOut</div>
        <div className="modal-footer">
            <button className="modal-logout" onClick={LogoutUser} >LogOut</button>
            <button onClick={()=>{setModal_show(false)}} className="modal-cancel">Cancel</button>
        </div>

    </div></div>):(<div></div>)}


    


    
    {profile_pic_update_show?(<div className="modal-show"><div className="modal-container-update">
        <div className="modal-cut-update" onClick={()=>{setprofile_pic_update_show(false)}}><img src="https://cdn-icons-png.flaticon.com/128/10165/10165395.png"></img></div>
        <div className="modal-header">Upload new profile pic</div>
        <div className="post-preview-update">
            <img id="output" src={profile_pic}></img>
        </div>
        <div className='create-post-select'>
          <input type="file" accept='image/*' onChange={(e)=>{loadFile(e);
          setImage(e.target.files[0])}}></input></div>
        <div className="modal-footer">
            <button onClick={postProfile_pic} className="modal-logout"  >Upload</button>
            
            <button onClick={RemoveProfilepic} className="modal-cancel">Remove</button>
        </div>

    </div></div>):(<div></div>)}


    <div className="profile">
        <div className="profile_sidebar" >
        <div className="profile_about">
            <img src={profile_pic} onClick={()=>{setprofile_pic_update_show(true)}} alt="profile"></img>
            <div className="profile-name">{username}</div>
            
            </div>
            <div className="profile_network">
                <div>
                <span>Posts</span> 
                <span className="profile_number">{posts.length}</span>
                </div>
                <div>
                <span>Followers</span>
                <span className="profile_number">{followers}</span>
                </div>
                <div>
                <span>Following</span>
                <span className="profile_number">{following}</span>
                 </div>
            
            
           
           </div>

           {/* <div className="profile_bio">
            <p>hello everyone what </p>
        <p>hi everyone kya hua </p>
        <p>content writer</p> </div> */}

        <div className="profile_buttons">
            <button onClick={handleLogout}>Logout</button>
            <button onClick={()=>{setprofile_pic_update_show(true)}}>Update </button>
            
            </div>
       
        </div>

<div className='profile_body'>
<div className="myposts-title">My Posts</div>
    <div className="myposts-container">
      
    {posts.map((post,index)=>
    (
        <div className="profile_posts">

          
    {showDelete[index]?(<div className="delete-show"><div className="delete-container">
        <div className="delete-cut" onClick={()=>{handleDeleteShow(index)}}><img src="https://cdn-icons-png.flaticon.com/128/10165/10165395.png"></img></div>
        <div className="delete-header">Are you sure you want to Delete</div>
        <div className="delete-footer">
            <button className="delete-logout" onClick={()=>{DeletePost(post._id,index)}} >Delete</button>
            <button onClick={()=>{handleDeleteShow(index)}} className="delete-cancel">Cancel</button>
        </div>

    </div></div>):(<div></div>)}
          <img onClick={()=>{handleDeleteShow(index)}}  className="three-dots" src="https://cdn-icons-png.flaticon.com/128/9581/9581117.png"></img>
          <img className="postprofile-img" src={post.photo}></img></div>
        )
        )}
        </div>
      
</div>

    </div>
    </>
  )
}

export default Profile