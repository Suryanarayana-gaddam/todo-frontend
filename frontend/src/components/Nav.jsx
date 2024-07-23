import React from 'react'
import LogOut from './LogOut'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='flex justify-between pt-4 bg-green-300 font-bold text-white'>
        <div className='relative bottom-2 left-5'>
            <img src={logo} alt=""  width={40} height={40}/>
        </div>
        <div className='nav flex justify-around gap-16'>
            <div className='nav-item'><Link to='/upcoming-tasks'>Upcoming Tasks</Link></div>
            <div className='nav-item'><Link to='/completed-tasks'>Completed Tasks</Link></div>
        </div>
        <div className='relative right-6'>
            <LogOut/>
        </div>
    </div>
  )
}

export default Nav
