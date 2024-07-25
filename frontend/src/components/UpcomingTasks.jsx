import { useEffect, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import { FaPlus, FaX } from 'react-icons/fa6';
import DisplayTasks from './DisplayTasks';

const UpcomingTasks = () => {
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [url,setUrl] = useState(null)
  const { data }  = useFetch(url);
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const userName = localStorage.getItem("username");

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
  };

  const handlePopup = () => {
    setVisible(true);
  };
  
  useEffect(() => {
    setUrl(`http://localhost:5990/get-tasks/${userName}`);
    const currentDateTime = new Date().toISOString().slice(0, 16);
    setTasks(data.filter(task => task.dateScheduled > currentDateTime))
  },[userName,data])

  const handleClose = () => {
    setVisible(false);
  }
  const formSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const taskTitle = form.title.value;
    const dateScheduled = form.datetime.value;
    const description = form.description.value;
    const taskData = { taskTitle, dateScheduled, description };
    fetch(`http://localhost:5990/addtask/${userName}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(taskData)
    })
    .then(res => res.json())
    .then(data => {
      form.reset();
      alert("Task added successfully:"+ data);
      setVisible(false);
      setTasks(prevTasks => [...prevTasks,taskData]);
      // Optionally, you can add logic to update state or show a success message
    })
    .catch(error => {
      console.error("Error adding task:", error);
      // Handle error appropriately (e.g., show error message)
    });
  };

  return (
    <div className={`grid grid-cols-1 place-items-center mt-24 px-3 h-screen ${visible ? "bg-opacity-30 bg-amber-400" : " "}`}>
      <div className={`${visible ? "hidden" : "flex"} relative w-full bottom-10 mt-3 `}>
        <div className='absolute left-10 top-0'><h1 className='text-[20px]'>Welcome <b>{userName}</b>, here&apos;s your upcoming tasks... </h1></div>
        <div className='absolute right-10 top-0'>
        <button onClick={handlePopup} className={`cursor-pointer flex  bg-green-400 rounded px-2 py-1 hover:bg-green-200 font-bold `}><FaPlus/><span className='relative bottom-1'> Add Task</span></button>
        </div>
      </div>
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
      <div className={` ${visible ? "hidden" : "block"} w-full`}>
        <DisplayTasks tasks={tasks} setTasks={setTasks} userName={userName} data={data}/>
      </div>
    </div>
  );
};

export default UpcomingTasks;
