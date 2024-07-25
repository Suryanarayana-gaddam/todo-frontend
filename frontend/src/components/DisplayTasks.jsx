import React from 'react'
import { Link } from 'react-router-dom';

const DisplayTasks = ({tasks,setTasks,data,userName}) => {
    const currentDateTime = new Date().toISOString().slice(0, 16);
    const handleDeleteTask = (taskId) => {
        const id = taskId;
        fetch(`http://localhost:5990/delete-task/${id}`,{
          method:"DELETE",
          headers:{
            "Content-type" : "application/json",
          },
          body:JSON.stringify({username:userName})
        }).then(res => res.json())
        .then(dataGot => {
          setTasks(data.filter(tasks => tasks._id !== dataGot.deletedTask._id));
          alert(`${dataGot.message}`);
        })
    } 

  return (
    <div className='relative bottom-0 mt-44 xl:bottom-44 gap-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center place-items-center w-full'>
      {tasks && tasks.map((task,index) =>(
          <div key={task._id} className='border-2 border-gray-500 w-full relative p-2 h-full'>
            <div className={`absolute top-3 right-2 ${currentDateTime > task.dateScheduled ? "hidden" : "block"}`}>
              <button className='p-1 rounded  bg-blue-400 hover:bg-white font-bold hover:text-blue-500'><Link to={`/update/task/${task._id}`}>Update</Link></button>
              <button onClick={() => handleDeleteTask(task._id)} className=' mx-2 p-1 rounded  bg-red-400 hover:bg-white font-bold hover:text-red-500'>Delete</button>
            </div>
            <p className='bg-amber-300 px-2 text-black h-10'>{index+1}</p>
            <p><b>Id :</b>{task._id}</p>
            <p><b>Task :</b> <span className='text-[18px]'>{task.taskTitle.toUpperCase()}</span></p>
            <p><b>Date :</b> {task.dateScheduled}</p>
            <p className='w-auto'><b>Description :</b> {task.description}</p>
          </div>
        ))}
    </div>
  )
}

export default DisplayTasks
