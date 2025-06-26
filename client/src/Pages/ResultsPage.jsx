// import React, { useEffect, useState} from 'react'
// import axios from 'axios'

// export default function ResultsPage() {

//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');
//   const API = import.meta.env.VITE_API;
//   const GET_HOUSES = import.meta.env.VITE_GET_HOUSES;

//   useEffect(() => {
    

//      const fetchData = async () => {
//       try{
//         const response = await axios.get(`${API}${GET_HOUSES}`)
//         setData(response.data)
//         console.log("data fetched sucesfully")
//       } catch(error){
//         const message = error.response ? error.response.data.error : error.message
//         setError(`Failed to fetch data: ${message}. Please try again later`)
//         console.log("Error fetching data:", message)
//       }
//      }
//      fetchData();
     
//   },[API, GET_HOUSES])

  
//   return (
//     <div>
//       <h1>Results</h1>
  
//       {error && <p style={{ color: "red" }}>{error}</p>}
  
//       {data.length > 0 ? (
//         <ul>
//           {data.map((house) => (
//             <li key={house.id}>
//               <strong>Address:</strong><p>{house.address}</p>
//               <strong>Price:</strong><p>{"£" + house.price.toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !error && <p>Loading Houses...</p>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function ResultsPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [params] = useSearchParams();
  const query = params.get('query');

  const API = import.meta.env.VITE_API; // e.g., http://localhost:5000

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/api/search?query=${encodeURIComponent(query)}`);
        setData(response.data);
      } catch (error) {
        const message = error.response ? error.response.data.error : error.message;
        setError(`Failed to fetch data: ${message}`);
      }
    };

    fetchData();
  }, [API, query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data.length > 0 ? (
        <ul className="space-y-4">
          {data.map((house) => (
            <li key={house.id} className="border rounded-xl p-4 shadow-sm">
              <p><strong>Address:</strong> {house.address}</p>
              <p><strong>Price:</strong> £{house.price.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No matching houses found.</p>
      )}
    </div>
  );
}
