import React from 'react'
import "./post.css"
import { useEffect,useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);
const [comment,setComment]=useState('');

const token=localStorage.getItem("jwt");
const navigate=useNavigate();
useEffect(()=>{
  if (!token) {
    navigate('/login');
    return ;
  }
  else{
    fetch('/post/get-posts',{
    method:'get',
    headers:{
  "Authorization":"Bearer "+localStorage.getItem('jwt')},
  
  
  }).then(res=>res.json())
  .then(data=>{setPosts(data);
})
  .catch(err=>console.log(err));
  }
}
  ,[])
  

  /************************************************ */
  const handleLike=(id)=>{
fetch('/post/like-post',{
method:'put',
headers:{"Content-Type":'application/json',
"Authorization":"Bearer "+localStorage.getItem('jwt')},
body:JSON.stringify({
postId:id
})
  }
).then(res=>res.json())
.then(result=>{
  //result h vo post jo like/unlike ki vo backend return krra h
  //new_posts h ki ham abhi jo posts k status h usme jo post backend ko di thi usme jo change hue vo consider krenge
  //baki posts k state to same hi rhegi
  //as posts set to new_posts and there occurs rerender but it doesn't scroll to top as react doesn't automatically scroll
  //to top which is good benefit here as we don't want to get to top 
  const new_posts=posts.map((post)=>{
    if(post._id===result._id){
return result;
    }
    else{
return post;
    }
  })
  console.log(new_posts);
  setPosts(new_posts);
})
.catch(err=>console.log(err))}


  /********************************************** */
const handleUnlike=(id)=>{
  fetch('/post/unlike-post',{
  method:'put',
  headers:{"Content-Type":'application/json',
  "Authorization":"Bearer "+localStorage.getItem('jwt')},
  body:JSON.stringify({
  postId:id
  })
    }
  ).then(res=>res.json())
  .then(result=>{
    const new_posts=posts.map((post)=>{
      if(post._id==result._id){
return result;
      }
      else{
return post;
      }
    })
    
  setPosts(new_posts);
  })
  .catch(err=>console.log(err))}
    
/*********************************************** */
const handleComment=(id,comment,index)=>{
  fetch('/post/create-comment',{
    method:'put',
    headers:{"Content-Type":'application/json',
    "Authorization":"Bearer "+localStorage.getItem('jwt')},
    body:JSON.stringify({
    postId:id,
    text:comment,
    })
      }
    ).then(res=>res.json())
    .then(result=>{
      const new_posts=posts.map((post)=>{
        if(post._id==result._id){
  return result;
        }
        else{
  return post;
        }
      })
      handleCommentChange('',index);
    setPosts(new_posts);
    })
    .catch(err=>console.log(err));
}


/*************handling comment section show********** */
const [showComments, setShowComments] = useState(Array(posts.length).fill(false));

const handleCommentsShow = (index) => {
  setShowComments((prevShowComments) => {
    const newShowComments = [...prevShowComments];
    newShowComments[index] = !newShowComments[index];
    return newShowComments;
  
    
  });
};

/**********handle input not targete d every comment input ******************* */
const [comments, setComments] = useState(Array(posts.length).fill(''));
const handleCommentChange = (value, index) => {
  setComments((prevComments) => {
    const newComments = [...prevComments];
    newComments[index] = value;
    return newComments;
  });
};

const handleProfileClick=(userId)=>{
  navigate(`/user-profile/${userId}`);
}

  return (
    <>
    {posts.map((post,index)=>
    <>
    <div className="post-box">
    <div  className="post">
        <div className="post_header">
          <div className="post_header_left">
            <img  onClick={()=>{
              handleProfileClick(post.postedBy._id);
            }} alt="creator" src={post.postedBy.profile_pic}></img>
        <span onClick={()=>{
              handleProfileClick(post.postedBy._id);
            }}>{post.postedBy.username}</span> 
        
        {/* <span id="time">: {index} m</span> */}
        </div>
        <div className="post_header_right">
{/* <img src="https://cdn-icons-png.flaticon.com/128/9195/9195918.png" alt="more"></img> */}
        </div>
        </div>
        <div className="post_image"><img  alt="post" src={post.photo}></img></div>
        <div className="post_footer">
          <div className="footer_icons">    
                   <div className="post_lefticons">
                    {post.likes.includes(JSON.parse(localStorage.getItem('user'))._id)?(
          <img  className="like-icon"  onClick={()=>{handleUnlike(post._id)}} src="https://cdn-icons-png.flaticon.com/128/2107/2107845.png"></img>
          ):(<img className="like-icon" onClick={()=>{handleLike(post._id)}} alt="like" src="https://cdn-icons-png.flaticon.com/128/812/812327.png"></img>
           )
                    } <img onClick={()=>{handleCommentsShow(index)}} alt="comment" src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"></img>
            {/* <img alt="share" src="https://cdn-icons-png.flaticon.com/128/2099/2099085.png"></img> */}
          </div>
          <div className="post_righticons">
            {/* <img src="https://cdn-icons-png.flaticon.com/128/10308/10308200.png"></img> */}
          </div>
          </div>
          <div className="likes-count">{post.likes.length} Likes</div>
          <div className="caption">{post.body}</div>
          <div className="view-comments" onClick={()=>{handleCommentsShow(index)}} >View all {post.comments.length} comments</div>
          <div className="add-comment">
            
          <img src="https://cdn-icons-png.flaticon.com/128/158/158420.png"></img>
            <input placeholder="Add Comment" value={comments[index]} onChange={(e)=>{handleCommentChange(e.target.value,index)}}></input>
            <button onClick={()=>{handleComment(post._id,comments[index],index)}} >Post</button>
          </div>
        </div>
        
    </div>

    {/* /****show-comment  */}
    {showComments[index]&&
    (<div className="show-comment-container"  >
     
    
      <div className="show-comment-cancel">
        <img onClick={()=>{handleCommentsShow(index)}} src="https://cdn-icons-png.flaticon.com/128/10165/10165395.png"></img>
      </div>
        <div className="comment-section-header">Comments</div>
        <div className="comment-section-main">
          
       { post.comments.map((comment)=>(
                      <div className="comment-ind">
            <div className="comment-ind-details">{comment.postedBy.username}</div>
              <div className="comment-ind-body">  {comment.comment}</div> 

                      </div>))}
                      
                      
                      
        </div>
       

    </div>)}


    </div>
    </>
    )}
    </>
  )
}

export default Posts