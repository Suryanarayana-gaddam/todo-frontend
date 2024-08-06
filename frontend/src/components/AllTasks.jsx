import React, { useEffect, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import DisplayTasks from './DisplayTasks';

const AllTasks = () => {
  const [url,setUrl] = useState(null)
  const { data }  = useFetch(url);
  const [tasks,setTasks] = useState([]);
  const userName = localStorage.getItem("username");
  useEffect(() => {
    setUrl(`https://todo-backend-six-lac.vercel.app/get-tasks/${userName}`);
    setTasks(data)
  },[userName,data])

  return (
    <div className={`grid grid-cols-1 justify-center place-items-center h-screen md:block p-3 mt-24`}>
      
      <div className={` w-full `}>
        <DisplayTasks tasks={tasks} setTasks={setTasks} userName={userName} data={data}/>
      </div>
    </div>
  );
};

export default AllTasks
