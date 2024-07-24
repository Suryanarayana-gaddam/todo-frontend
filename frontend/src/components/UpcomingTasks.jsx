import React, { useEffect, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import { FaCross, FaPlus, FaX } from 'react-icons/fa6';

const UpcomingTasks = () => {
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [url,setUrl] = useState(null)
  const { data }  = useFetch(url);
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  function getCurrentDateTime() {
    const today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');
    let hours = today.getHours().toString().padStart(2, '0');
    let minutes = today.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Handle change in input value
  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
    //console.log('Selected Date and Time:', dateTime);

  };

  const handlePopup = () => {
    setVisible(true);
  };
  
  
  const userName = localStorage.getItem("username");
  useEffect(() => {
    setUrl(`http://localhost:5990/gettasks/${userName}`);
    const currentDateTime = new Date().toISOString().slice(0, 16);
    console.log("currentDateTime:",currentDateTime)
    setTasks(data.filter(task => task.dateScheduled > currentDateTime))
  },[userName,data])

  const handleClose = () => {
    setVisible(false);
  }
  const formSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Date and Time:', dateTime);
    const form = e.target;
    const username = userName;
    const id = data.length+1;
    const taskTitle = form.title.value;
    const dateScheduled = form.datetime.value;
    const description = form.description.value;
    const taskData = { username, id, taskTitle, dateScheduled, description };
    console.log("taskData:",taskData)
    fetch("http://localhost:5990/addtask", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(taskData)
    })
    .then(res => res.json())
    .then(data => {
      form.reset();
      alert("Task added successfully:", data);
      console.log("Task added successfully:", data);
      setVisible(false);
      // Optionally, you can add logic to update state or show a success message
    })
    .catch(error => {
      console.error("Error adding task:", error);
      // Handle error appropriately (e.g., show error message)
    });
  };

  return (
    <div className={`grid grid-cols-1 place-items-center h-screen md:p-2 ${visible ? "bg-opacity-20 bg-red-400" : " "}`}>
      <button onClick={handlePopup} className={`${visible ? "hidden" : "inline-flex"} cursor-pointer bg-green-400 rounded p-2 hover:bg-green-200 font-bold xl:relative w-fit bottom-16`}><FaPlus/><span className='relative bottom-1'> Add Task</span></button>
      <div className={`${visible ? "block" : "hidden"}  w-[400px] p-2`}>
        <div className='grid justify-center place-items-center p-2 h-[500px] w-full'>
          <form onSubmit={formSubmit} className={`${visible ? "bg-white" : ""} relative border-2 outline outline-black p-3 space-y-2`}>
            <h1 className='text-center font-bold text-3xl'>Add A New Task </h1>
            <FaX onClick={handleClose} className='absolute top-0 right-2 cursor-pointer'/>
            <label htmlFor="title" className='font-semibold text-2xl'>Task Title :</label>
            <input type="text" name='title' id='title' required autoFocus className=' border-gray-400 border-2 outline-none text-center w-full text-xl' />
            <label htmlFor="datetime" className='font-semibold text-2xl'>Scheduled Date :</label>
            <input  type="datetime-local"
              id="datetime"
              name="datetime"
              value={dateTime}
              min={getCurrentDateTime()}
              onChange={handleDateTimeChange}
              required 
              className='border-gray-400 border-2 outline-none text-center w-full' />
            <label htmlFor="description" className='font-semibold text-2xl'>Task Description :</label>
            <textarea name="description" id="description" required className='border-gray-400 border-2 outline-none text-center w-full text-xl'></textarea>
            <div className='pl-32'>
              <button type='submit' className='border-2 border-gray-500 px-2 font-semibold'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className={` ${visible ? "hidden" : "block"} xl:relative xl:bottom-44 gap-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center place-items-center w-fit`}>
        {tasks && tasks.map((task,index) =>(
          <div key={task.id} className='border-2 border-gray-500 w-full p-2 h-full'>
            <p className='bg-amber-300 px-2 text-black'>{index}</p>
            <p><b>Id :</b>{task.id}</p>
            <p><b>Task :</b> {task.taskTitle}</p>
            <p><b>Date :</b> {task.dateScheduled}</p>
            <p className='w-auto'><b>Description :</b> {task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;
