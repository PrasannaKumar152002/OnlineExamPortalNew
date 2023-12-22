// Logout.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LogOut = () => {
  const nav=useNavigate();
  useEffect(()=>{
    sessionStorage.setItem("role","login");
    nav("/")
    window.location.reload();
  });
  return (
    <div>
      {/* <h2 onClick={}>Logout Page</h2> */}
      {/* Add your logout content here */}
    </div>
  );
};

export default LogOut;
