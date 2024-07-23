import React from 'react'

const Child2 = (props) => {
  
  return (
    <div className='border flex justify-center w-72 ml-[500px] mt-10'>
      <input type="text" autoFocus placeholder='Enter color name ...' className='h-10 border w-72 text-center border-amber-400' value={props.color} onChange={(e) => props.setColor(e.target.value)}/>

    </div>
  )
}

export default Child2
