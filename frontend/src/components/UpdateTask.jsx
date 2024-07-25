import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

const UpdateTask = () => {
    const {_id,username,taskTitle,dateScheduled,description} = useLoaderData();
    const [dateTime, setDateTime] = useState(dateScheduled);
    const navigate = useNavigate();
    function getCurrentDateTime() {
        const today = new Date();
        let year = today.getFullYear();
        let month = (today.getMonth() + 1).toString().padStart(2, '0');
        let day = today.getDate().toString().padStart(2, '0');
        let hours = today.getHours().toString().padStart(2, '0');
        let minutes = today.getMinutes().toString().padStart(2, '0');
    
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      }

      const handleDateTimeChange = (e) => {
        setDateTime(e.target.value);        
      };
      const formSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const taskTitle = form.title.value;
        const dateScheduled = form.datetime.value;
        const description = form.description.value;
        const taskData = { taskTitle, dateScheduled, description };
        fetch(`http://localhost:5990/update/task/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(taskData)
        })
        .then(res => res.json())
        .then(data => {
          form.reset();
          navigate("/");
          alert("Task updated successfully.");
        })
        .catch(error => {
          console.error("Error updating task:", error);
        });
      };

  return (
    <div className='grid grid-cols-1 place-items-center justify-center h-screen'>
      <form onSubmit={formSubmit} className={`w-96 relative border-2 outline outline-black p-2 space-y-2`}>
            <h1 className='text-center font-bold text-3xl p-2 bg-neutral-400'>Update Task </h1>
            
            <label htmlFor="title" className='font-semibold text-2xl'>Task Title :</label>
            <input 
                type="text" 
                name='title' 
                id='title' 
                required 
                autoFocus 
                className=' border-gray-400 border-2 outline-none text-center w-full text-xl' 
                defaultValue={taskTitle}
            />
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
            <textarea 
                name="description" 
                id="description" 
                required 
                defaultValue={description}
                className='border-gray-400 border-2 outline-none text-center w-full text-xl'>
            </textarea>
            <div className='pl-32'>
                <button 
                    type='submit' 
                    className='border-2 text-xl bg-gray-300 font-bold hover:text-blue-500 rounded hover:scale-90 hover border-gray-500 px-2 p-1'
                >
                    Submit
                </button>
            </div>
          </form>
    </div>
  )
}

export default UpdateTask
