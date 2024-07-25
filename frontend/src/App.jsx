
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Nav from './components/Nav'
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("username")){
      return navigate("/home");
    }
  },[localStorage.getItem("username")])
  
  return (
    <>
      <Nav/>
      <div className='min-h-screen'>
          <Outlet/>
      </div>
      <Footer/>
    </>
  )
}

export default App
