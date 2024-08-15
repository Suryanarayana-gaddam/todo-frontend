import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [isShowClicked,setIsShowClicked] = useState(false);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const user = {
      username,email,password
    }
    fetch("https://todo-backend-six-lac.vercel.app/register-user",{
      method:"POST",
      headers : {
        "content-type" : "application/json",
      },
      body:JSON.stringify(user)
    }).then(res => {
      if(res.status == 403){
        alert(res.status+" : Existing User, Please login!");
        navigate("/login");
      }else{
        alert("Signed Up Successfully!")
        localStorage.removeItem("username")
        localStorage.setItem("username",username)
        setIsLoading(true);
        setTimeout(() => {
          navigate("/login");
          setIsLoading(false);
        },3000)
      }
    }).catch(error =>{
      alert("Error:",error)
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
      <form onSubmit={handleSignUp} className='form bg-slate-50 text-blue-500 transition-all duration-2s w-96 h-fit p-6 rounded-xl shadow-2xl flex-row flex-wrap flex-grow'>
        <h1 className='bg-rose-500 text-transparent bg-clip-text h-12 text-center font-bold text-4xl'>Sign Up Form</h1>
        <div>
          <div className="label text-xl mb-2">Name*</div>
          <input type="text" name='name' id='name' placeholder='Enter your name' autoComplete='off' required autoFocus onChange={e => {e.target.value = e.target.value.toUpperCase()}}  className='w-full p-1  bg-gray-200 text-black' />
        </div>
        <div>
          <div className="label text-xl mb-2">Email*</div>
          <input type="email" name='email' id='email' placeholder='Enter your email' required autoComplete='off' onChange={e => {e.target.value = e.target.value.toLowerCase()}} className='w-full p-1 bg-gray-200 text-black' />
        </div>
        <div className='relative'>
          <div className="label text-xl mb-2">Password*</div>
          <input type={isShowClicked ? "text" : "password"} name='password' id='password' placeholder='Enter your password' required   className='bg-gray-200 p-1 text-black w-full' />
          <button type='button'  onClick={() =>{if(isShowClicked){setIsShowClicked(false)}else{setIsShowClicked(true)}}} className='absolute right-3 top-11 text-black'>{ isShowClicked ? <FaEyeSlash/> : <FaEye/>}</button>
        </div>
        <p>Already have an account, please <Link to="/login" className='text-indigo-800 hover:underline'>login</Link> here.</p><br />
        <div><button className='bg-indigo-700 w-full text-center p-1 rounded font-semibold hover:text-green-500 hover:bg-white'>SignUp</button></div>
      </form>
    </div>
  )
}

export default SignUp
