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
   const user=JSON.parse(localStorage.getItem('user')).username;
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
const navigate=useNavigate();
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
            <img id="output" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAACUCAMAAAA9M+IXAAAAZlBMVEX///8AAADr6+txcXGpqanv7+94eHj4+Pj8/Pzz8/NlZWVsbGx1dXVoaGienp5+fn7GxsYrKyvc3Nzi4uKysrKWlpaGhoa8vLxAQEBJSUkgICA0NDQ7OzuQkJAPDw8ZGRlWVlbS0tJR+RN3AAAEYElEQVR4nO2ca5tjMBSAS2tcalC0aIv6/39y57KzgpMLcjm7m/fbPA/6PpkkTk5OHA4Wi8VisawgT+IjCuIk57kG2cVBxCULmLY304Jzbizf1LTdkpRum5h2g0iog+xpWg3iSRtwJ9NmMCfY1o9Mi8FEPqjrmvai4VpdhQjoXq65Z4y8vazTrQd4OOpiqNfodqVmvQXlGt0XfIVGimaF7ptmuSVe9FfphlZXIVZXJfh0/fADn7K4QaZbVElcPx/1e1uB4Tcq3aIl3gJNCrzxMem2vTOhu4V4dfPGWfDMsOoO4AL2XuHUdful65fvtH2R6IYdbOs4j8mAw6EbMPJEZ3LFi0M3o3SFL8jui0LXPzJsnR6bbs6ydRxitKHQ5eQMY2S6D7ZuM77cwncEumxbci7DoFtwdPtxbsCgyxlpjjOmN6yudN0Ol67H0SXCHAy6vJmhLnDpcrYTXuM6E4VuxtZtxyt9DLrunalLePlnBLrsvbAjcSEO3QJYVv5wJxMOOHRZzTvZTVWpG4ReyNzJJ6CuftLJE9TphtntVb9u1SK1AUNZUETT25XpFr8f3EViGxoh2L7n2c2qdIm7moJ/+SfL/ttd531Jka5H5mREfYt0ss13j5ZJSDW6YTxppZdg/w2G5M+MVl8zYEtdje519l99id548NzslCRJVnjgnKJEd9kLI8H25aFCF4pYUtEJWLsuXLvDKE0yqutS3v8t/1YTutRYO5HQH6TrzieFkV5CeYFsXWbkOt9pMK5bUbPgcnzl6uacQtTH3uIYqbrBi23rOJed9SYydYXq+eAf8U7NM87hujuS4Mh7krhuK2DrNNCvlN9vluUupULd0hECCB/anwF61qc7iNl+tO/sdRES/ZHnK00352TsCY6T9s0n4/PG7r+ydEPupEBxmhTefa53tOiuK/Idw51qMVNTq7Ql6gpNCgTpd3/woAiDUvYsUVdwUiCIyiJ0K/B/0le0n5GkO7AziCBd3TSUAKOnhxYydHkbTeuhhhYSdD1G+nAjPc13v66v4szKk5JJ2a9LXz7sgRK67dZVdQjkCdrs1R0U2X5MdZDOTl1Wln4vRyicJJJv63XdNZHCaiJgpb9Ll1lDsx8gPNujq2ZSIFiGOzt0NZwMW4ST23W1HBedt+9mXVfPIcFZpmqzrqajuN00nNyoS+YnFDMJJ7fpBhpPt3ZkeLZNt9JnOz20ukmXW5skFyITuEW3EM8pyKF2d+h6+o/iRt5mXSXLBx4/vut1lUcKIOdwm67WSYEg3qQ7GPuwxO3T5m38W0Q3r5fP0UW7Wpe/+6CS6zrd1PR3MMp1rbs20Sidkmgvru59Q+pOLhdioP97XxDAhNVVidVVidVVidVVidVVidVVidVVidVVCaUizfiKB+bugbp+zL/VBDGlJmp95YoWaNXAandSt0L/2BjnbKEZGKXACD9cyareOpTsomf9cMrYvbRGM5/d6xSew0jc7ISEzPgX/SwWi+W/5xcAUlujetR98QAAAABJRU5ErkJggg=="></img>
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