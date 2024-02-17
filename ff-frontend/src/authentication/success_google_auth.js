import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';







function Success_google_auth() {
    const navigate=useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const user = JSON.parse(searchParams.get('user'));
    useEffect(()=>{
        //notifySuccess("Logged In successfully");
        localStorage.setItem('jwt',token);
        localStorage.setItem('user',JSON.stringify(user));
        navigate('/');
    },[])

  return (
    <div>Success_google_auth</div>
  )
}

export default Success_google_auth