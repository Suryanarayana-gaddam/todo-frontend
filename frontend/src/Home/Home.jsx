import React from 'react'
import { Link } from 'react-router-dom'
import img from "../assets/to-do-banner.jpg"
const Home = () => {
  
  
  return (
    <div className='bg-opacity-20 grid justify-center place-items-center h-screen gap-2'>
        <img src={img}  alt="" className='opacity-15  w-screen h-screen'/>
      <div className='relative bottom-80 shadow-black shadow-2xl'>
      <button type='button' className='mr-1 bg-yellow-500 hover:text-orange-400 hover:font-bold hover:bg-black shadow-xl p-2 w-24 rounded'><Link to={"/signup"}>Sign Up</Link></button>
      <button type='button' className='ml-1 bg-yellow-500 hover:text-orange-400 hover:font-bold hover:bg-black shadow-xl p-2 w-24 rounded'><Link to={"/login"}>Login</Link></button>
      </div>
    </div>
  )
}

export default Home
