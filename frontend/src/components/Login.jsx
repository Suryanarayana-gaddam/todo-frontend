import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [isShowClicked,setIsShowClicked] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const userData = {
      email,
      password
    }
    fetch(`https://todo-backend-six-lac.vercel.app/login`,{
      method:"POST",
      headers:{
        "Content-type" : "application/json",
      },
      body:JSON.stringify(userData)
    }).then(res => {
      if(res.status == 404){
        alert(res.status+" : User not found");
      }else if(res.status == 401){
        alert(res.status+" : Password is Incorrect");
      }else{
        alert("Welcome Back User...")
        setIsLoading(true);
        setTimeout(() =>{
          navigate("/upcoming-tasks",{replace:true});
          setIsLoading(false);
        },3000);
      }
      return res.json();
    }).then(response => {
      localStorage.removeItem("username")
      localStorage.setItem("username",response.username)
    }).catch(error =>{
      console.error("Error in Login:",error)
    })
  }

  if(isLoading){
    return <div className='grid place-items-center justify-center h-screen'>
          <div>
            <div className={`border-t-8 border-b-8 h-28 w-28 rounded-full border-rose-300 animate-spin`}></div>
            <div className={`text-4xl text-red-400 animate-bounce relative bottom-[80px] left-[43px]`}>...</div>
            <div className='relative bottom-8 right-2'>Loading please wait...</div>
          </div>
    </div>
  }

  return (
    <div className='grid justify-center items-center h-screen bg-red-100'>
      <form onSubmit={handleLogin} className='form bg-slate-50 text-blue-500 transition-all duration-2s w-96 h-fit p-6 rounded-xl shadow-2xl flex-row flex-wrap flex-grow'>
        <h1 className='bg-rose-500 text-transparent bg-clip-text h-12 text-center font-bold text-4xl'>Login Form</h1>
        
        <div>
          <div className="label text-xl mb-2">Email*</div>
          <input type="email" name='email' id='email' autoFocus autoComplete='off' placeholder='Enter your email' required  onChange={e => {e.target.value = e.target.value.toLowerCase()}} className='w-full p-1  bg-gray-200 text-black' />
        </div>
        <div className='relative'>
          <div className="label text-xl mb-2">Password*</div>
          <input type={isShowClicked ? "text" : "password"} name='password' id='password'  placeholder='Enter your password' required   className='bg-gray-200 p-1 text-black  w-full' />
          <button type='button' onClick={() =>{if(isShowClicked){setIsShowClicked(false)}else{setIsShowClicked(true)}}} className='absolute right-3 top-11 text-black'>{ isShowClicked ? <FaEyeSlash/> : <FaEye/>}</button>
        </div>
        <p>Don&apos;t have an account, please <Link to="/signup" className='text-blue-800 font-bold hover:underline'>SignUp</Link> here.</p><br />
        <div><button className='hover:bg-zinc-800 w-full text-center p-1 rounded font-bold hover:text-green-500 text-white bg-blue-600 duration-300'>Login</button></div>
      </form>
    </div>
  )
}

export default Login
