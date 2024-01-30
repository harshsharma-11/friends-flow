import React from 'react'
import "./create-post.css"
import { useState } from 'react';
import {useEffect} from 'react'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
function CreatePost() {

  const [image,setImage]=useState("");
  const [body,setBody]=useState("");
  const [url,setUrl]=useState("");
  const [user,setUser]=useState('');
  const navigate=useNavigate();
  const token=localStorage.getItem("jwt");
  
  useEffect(() => {
    console.log('hello');

    if (!token) {
      navigate('/login');
    }
    else{
      setUser(JSON.parse(localStorage.getItem('user')).username);
    }
  }, []); // Make sure to include the dependency array

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

  
const notifyError = (msg) => toast.error(msg);
const notifySuccess = (msg) => toast.success(msg);

  const postDetails=()=>{
    //posting image to cloudinary https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload

    //saving post to mongodb via backend
    fetch('/post/create-post',{
      method:'post',
      headers:{"Content-Type":'application/json',
    "Authorization":"Bearer "+localStorage.getItem('jwt')},
body:JSON.stringify({
  image,pic:url,body
})

    }).then(res=>res.json())
    .then(data=>{if(data.message){
      notifySuccess('Post created SuccessFully');
      navigate('/');
    }
  else{
    notifyError(data.error)
  }})
    .catch(err=>console.log(err));
    
  }

  return (
    <div className="create-post-container">
        <div className="create-post-head">
<div className="create-post-heading">Create New Post</div>
<div className="create-post-share" ><div onClick={postDetails}>Share</div></div>
        </div>
        <div className="post-preview">
            <img id="output" src="https://i.pinimg.com/originals/3e/61/f4/3e61f45b6d76038c7c43918b2a35f54a.jpg"></img>
        </div>
        <div className='create-post-select'>
          <input type="file" accept='image/*' onChange={(e)=>{loadFile(e);
          setImage(e.target.files[0])}}></input></div>
        <div className="create-post-footer"> 
        <div className="create-post-user">
            <div className="create-post-user-image">
                <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"></img>
            </div>
            <div className="create-post-user-name">{user}</div>
        </div>
        <div className="create-post-caption">
          <textarea onChange={(e)=>{
            setBody(e.target.value);
          }} rows="4" cols="60" placeholder="Write a caption...."></textarea>
        </div>
        </div>
        
    </div>
  )
}

export default CreatePost