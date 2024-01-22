import React, {useState} from "react";
import axios from 'axios';


const Country=()=> {
const[data,setdata]=useState([]);
const[keyword,setKeyword]=useState();
const [error, setError] = useState(null);

    const handlechange=(e)=>{
        const text=e.target.value;
        setKeyword(text);
    }
// Function to fetch country information based on the country code
  const countrydata = async (e) => {
    e.preventDefault();
    try {
      // Make a GET request to REST Countries API
      const response = await axios.get(`https://restcountries.com/v3.1/name/`+keyword);

      // Update state with the new country data
      setdata(response.data);
      setError(null); // Reset any previous errors
    } catch (error) {
      // Handle errors
      setdata(null); // Reset country data on error
      setError('Error fetching country information');
      console.error('Error fetching country information:', error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-800 rounded shadow-lg">
      <div>
      <h1 className="head">Country Guide App</h1>
      </div>
<div>
<div>
   <input
        
        type='text'
        id='keyword'
        name='keyword'
        placeholder='Search for country...'
        onChange={e=>handlechange(e)}
        value={keyword}
        className="flex-grow px-4 py-2 rounded-l focus:outline-none"
    />       
  <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-r" onClick={countrydata}>SEARCH</button> 
  </div>
</div>
{data.map(data=>{
       return(
        <div>
            <img src={data.flags.png} width={100} height={100} className="flag-img"/>
            <h2 className="text-3xl font-bold underline">{data.name.common}</h2>
             <ul>
                <h5 className="text-2xl font-bold underline">Capital:  </h5>
                <span>{data.capital}</span>
               </ul>
                <ul>
                <h5 className="text-2xl font-bold underline">Continent:  </h5>
                <span>{data.continents}</span>
                </ul>
                <ul>
                <h5 className="text-2xl font-bold underline">Population:  </h5>
                <span>{data.population}</span>
                </ul>
                <ul>
                <h5 className="text-2xl font-bold underline">Currency:  </h5>
                <span>{
                  data.currencies[Object.keys(data.currencies)].name
                } -{Object.keys(data.currencies)[0]}</span>
                </ul>
                <ul>
                <h5 className="text-2xl font-bold underline">Common Languages:  </h5>
                <span>{Object.values(data.languages).join(",")}</span>
                </ul>               
            </div>
  
        
       )})}
       {/* Display error if there is an issue with the API request */}
      {error && <p>{error}</p>}
</div>
    
  )
}

export default Country


