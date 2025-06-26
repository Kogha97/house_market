import React, { useEffect, useState} from 'react'
import axios from 'axios'
import SearchBar from '../Components/SearchBar';

export default function HomePage() {

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const API = import.meta.env.VITE_API;
  const GET_HOUSES = import.meta.env.VITE_GET_HOUSES;

  // useEffect(() => {
    

  //    const fetchData = async () => {
  //     try{
  //       const response = await axios.get(`${API}${GET_HOUSES}`)
  //       setData(response.data)
  //       console.log("data fetched sucesfully")
  //     } catch(error){
  //       const message = error.response ? error.response.data.error : error.message
  //       setError(`Failed to fetch data: ${message}. Please try again later`)
  //       console.log("Error fetching data:", message)
  //     }
  //    }
  //    fetchData();
  // },[API, GET_HOUSES])


  return (
    <div>
      <h1>HomePage</h1>
      <div>
        <SearchBar onResults={setData}/>
    </div>
    </div>

  );
}
