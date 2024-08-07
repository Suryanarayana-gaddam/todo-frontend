import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data,setData] = useState([])

    useEffect(() => {
        if(url){
            const fetchData = async () => {
                try{
                    const response = await fetch(url);
                    if(!response.ok){
                         return console.log(`Error fetching data from ${url}`) 
                    }
                    const resData = await response.json();
                    setData(resData);
                }catch(error) {
                    alert("Error in Fetch:"+error)
                }
            }
            fetchData();
        }
    },[url])
  return {data}
}
export default useFetch;
