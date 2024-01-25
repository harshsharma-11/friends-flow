import React,{useEffect, useState} from 'react'
import "./suggestion.css"
import SuggestedUser from "./suggested_user"
import { useNavigate } from 'react-router-dom';

function Suggestion() {
  const [users,setUser]=useState([]);

const current_user_id=JSON.parse(localStorage.getItem('user'))._id;
console.log(current_user_id);  

 useEffect(() => {
  console.log("hey");
  fetch('/user/suggestion', {
    method: 'get',
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('jwt'),
    },
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    setUser(data);
    console.log(data);
  })
  .catch(err => console.error(err));
}, []);

  return (
    <div className="suggestion">
      <div className="suggestions_title">Suggestions for you</div>
      <div  className="suggestions_body">
      {users.map((user) => {
          if (user._id !== current_user_id) {
            return (
              <SuggestedUser
                key={user._id} // Add a unique key for each mapped element
                username={user.username}
                profimage={user.profile_pic}
                userId={user._id}
              />
            );
          }
          return null; // Add a return statement for the else case
        })}
      </div>
    </div>
  )
}

export default Suggestion;