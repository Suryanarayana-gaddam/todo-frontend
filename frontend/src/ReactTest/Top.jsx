import React, { useState } from 'react'
import Child1 from './Child1'
import Child2 from './Child2'
import useFetch from '../../Hooks/useFetch'

const Top = () => {
  const [color,setColor] = useState("")
  const [url,setUrl] = useState(null);
  const {data} = useFetch(url)
  console.log(data)
  const handleGetData = (e) =>{
    e.preventDefault();
    e.target.className = "none"
    setUrl(`https://fakestoreapi.com/products`)
  }
  return (
    <div>
      <button onClick={handleGetData} className=''>Click to get data</button>
      <div>{ data.length > 1 ?  data.map(item => (
        <ul key={item.id}>
          <li className='text-red-700'>{item.title}</li>
          <li >{item.category}</li>
          <li >{item.description}</li>
        </ul>
      )) :
        (<ul >
          <li>{data.title}</li>
          <li>{data.category}</li>
          <li>{data.description}</li>
        </ul>
      )}
      </div>
    </div>
  )
}

export default Top
