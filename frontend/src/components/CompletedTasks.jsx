import React, { useEffect, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import getCurrentDateTime from './CurrentTime'; "./CurrentTime"
const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [url,setUrl] = useState(null)
  const { data }  = useFetch(url);
  
  const userName = localStorage.getItem("username");
  useEffect(() => {
    setUrl(`https://todo-backend-six-lac.vercel.app/get-tasks/${userName}`);
    const currentDateTime = getCurrentDateTime();
    setTasks(data.filter(task => task.dateScheduled < currentDateTime))
  },[userName,data])

  return (
    <div className={`grid grid-cols-1 place-items-center h-screen md:block p-3 mt-24`}>
      {tasks.length == 0  ? <h1 className='text-center font-bold'>You don&apos;t have any tasks in this section currently!</h1> : 
      <div className={` gap-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center place-items-center`}>
        {tasks && tasks.map((task,index) =>(
          <div key={task._id} className='border-2 border-gray-500 w-full h-full p-2'>
            <p className='bg-amber-300 px-2 text-black'>{index+1}</p>
            <p><b>Id :</b>{task._id}</p>
            <p><b>Task :</b> {task.taskTitle}</p>
            <p><b>Date :</b> {task.dateScheduled}</p>
            <p className='w-auto'><b>Description :</b> {task.description}</p>
          </div>
        ))}
      </div>}
    </div>
  );
};


export default CompletedTasks
