import React from 'react'

const Child1 = (props) => {

  return (
    <div style={{backgroundColor:props.color}} className={`text-center pt-32 font-bold  justify-center  border outline-double max-w-72 min-h-72  ml-[500px] mt-[100px]`}>
      {props.color ? props.color : "Default White"}
    </div>
  )
}

export default Child1
