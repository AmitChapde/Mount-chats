import React, { useEffect, useState } from 'react';
import HomeLoader from '../Loader/HomeLoader';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setLoading(false);
    },2000)

    return ()=>clearTimeout(timer);
  },[])

  if(loading){
    return <HomeLoader/>
  }

  const handleLogout=()=>{
    const token=localStorage.getItem('token');
    if(token){
      localStorage.removeItem('token');
      navigate('/')
    }else{
      window.location.href="http://localhost:5000/auth/logout"
    }
  }
  return (
    <div className='flex flex-row gap-7'>
     <h1>Home</h1>
     <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;