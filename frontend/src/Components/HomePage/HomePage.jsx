import React, { useEffect, useState } from 'react';
import HomeLoader from '../Loader/HomeLoader';


function HomePage() {
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
  return (
    <div>
     Home Component
    </div>
  );
}

export default HomePage;