import React from 'react'
import { useNavigate } from 'react-router-dom';
const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Do you want to Log Out ?");
    if(isConfirmed){
      localStorage.removeItem("username");
      console.log("Logged out !")
      navigate("/")
    }
  }
  return (
    <div>
      <button onClick={handleLogout} className='bg-red-500 text-white hover:bg-white hover:text-red-500 p-1 rounded'>Log Out</button>
    </div>
  )
}

export default LogOut
