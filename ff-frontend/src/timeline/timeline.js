import React, { useState } from 'react';
import "./timeline.css"
import Suggestion from "./suggestion.js"
import Post from "./posts/post"
import { useEffect } from 'react';
function Timeline() {



  return (
    <div className="timeline">
      {/* Your JSX content goes here */}
      
      <div className="timeline_left">
        
        <div className="timeline_post">
            <Post/>
        </div>
      </div>
      
      <div className="timeline_right"> <Suggestion/></div>
      
    </div>
  );
}

export default Timeline;