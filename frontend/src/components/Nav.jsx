import React, { useEffect, useState } from 'react'
import LogOut from './LogOut'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

const Nav = () => {
  const [underline1,setUnderline1] = useState(false);
  const [underline2,setUnderline2] = useState(false);
  const [underline3,setUnderline3] = useState(false);
  useEffect(() => {
    if(location.href == "http://localhost:5173/upcoming-tasks"){
      setUnderline2(false)
      setUnderline3(false)
      setUnderline1(true)
    }else if(location.href == "http://localhost:5173/completed-tasks"){
      setUnderline1(false)
      setUnderline3(false)
      setUnderline2(true)
    }else{
      setUnderline1(false)
      setUnderline2(false)
      setUnderline3(true)
    }
  },[location.href,underline1,underline2,underline3])
  
  return (
    <div className='flex justify-between pt-4 bg-green-300 font-bold text-white'>
        <div className='relative bottom-2 left-5'>
            <img src={logo} alt=""  width={40} height={40}/>
        </div>
        <div className='nav flex justify-around gap-16'>
            <div className={`${underline1 ? "underline font-extrabold text-green-800" : ""}`}><Link to='/upcoming-tasks'>Upcoming Tasks</Link></div>
            <div className={`${underline2 ? "underline font-extrabold text-green-800" : ""}`}><Link to='/completed-tasks'>Completed Tasks</Link></div>
            <div className={`${underline3 ? "underline font-extrabold text-green-800" : ""}`}><Link to='/all-tasks'>All Tasks</Link></div>
        </div>
        <div className='relative right-6'>
            <LogOut/>
        </div>
    </div>
  )
}

export default Nav
