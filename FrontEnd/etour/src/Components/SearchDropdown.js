import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchDropdown.css';

const SearchDropdown = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [searchName, setSearchName] = useState(''); 
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState([]);
    const [data6, setData6] = useState([]);
    const [searchCost, setSearchCost] = useState('');
    const [selectedPkgId, setSelectedPkgId] = useState('');
    const [selectedPkgId1, setSelectedPkgId1] = useState('');
    const [selectedPkgId3, setSelectedPkgId3] = useState('');
    const [selectedPkgId2, setSelectedPkgId2] = useState('');

    let navigate = useNavigate();

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (option === 'Search by Date') {
            setData1([]);
        } else if (option === 'Search by Name') {
            setData([]);
        } else if (option === 'Search by Cost') {
            setData2([]);
        } else if (data3.length > 0) {
            setData3([]);
        }
        console.log("Option selected:", option);
    }

    const fetchDataByName = async () => {
        try {navigate('/');
            const response = await fetch(`http://localhost:8080/api/subcategoriesByName/${searchName}`);
            const result = await response.json();
            setData(result);
            console.log("hello");

            console.log(result);
        } catch (error) {
            console.error('Error fetching data by name:', error);
        }
    };

    const fetchDataByCost = async () => {
        try {navigate('/');
            console.log(searchCost);
            const response2 = await fetch(`http://localhost:8080/api/by-cost/${searchCost}`);
            const datahere = await response2.json();
            const catidd = datahere[0].
            subCategoryMaster
            .subCat_id;            
            console.log(catidd);
            const response4 = await fetch(`http://localhost:8080/api/subCategories/${catidd}`);
            const result = await response4.json();
            setData2(result);
        } catch (error) {
            console.error('Error fetching data by cost:', error);
        }
    };

    const fetchAdditionalData = async (pkgId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/package_master/${pkgId}`);
            const result = await response.json();
            setData3(result);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    const fetchAdditionalData2 = async (catMasterId) => {
        try {
            const response1 = await fetch(`http://localhost:8080/api/category_master/bycatMasterId/${catMasterId}`);
            const result = await response1.json();
            setData5(result);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    useEffect(() => {
        if (selectedPkgId && data3.pkgId) {
            setSelectedPkgId2(data3.catMasterId);
            fetchAdditionalData2(data3.catMasterId);
        }
    }, [data3, selectedPkgId]);

    const fetchAdditionalData1 = async (pkgId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/package_master/${pkgId}`);
            const result = await response.json();
            setData4(result);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    useEffect(() => {
        if (selectedPkgId1 && data4.pkgId) {
            setSelectedPkgId3(data4.catMasterId);
            fetchAdditionalData3(data4.catMasterId);
        }
    }, [data4, selectedPkgId1]);

    const fetchAdditionalData3 = async (catMasterId) => {
        try {
          
            const response2 = await fetch(`http://localhost:8080/api/category_master/bycatMasterId/${catMasterId}`);
            const result = await response2.json();
            setData6(result);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    const handleDateSearch = async () => {
        try {navigate('/');
            const response = await fetch(`http://localhost:8080/api/dateMaster/by-date-range/${startDate}/${endDate}`);
            const result = await response.json();
            setData1(result);
            console.log("FEATCH BY STARTDATE AND END DATE");
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h3>Search Options:</h3>
            <div className='dropdown-container'>
                <div className="dropdown-button-wrapper">
                    <button onClick={() => handleOptionSelect('Search by Date')} className='dropdown-button'>
                        Search by Date
                    </button>
                </div>
                <div className="dropdown-button-wrapper">
                    <button onClick={() => handleOptionSelect('Search by Name')} className='dropdown-button'>
                        Search by Name
                    </button>
                </div>
                <div className="dropdown-button-wrapper">
                    <button onClick={() => handleOptionSelect('Search by Cost')} className='dropdown-button'>
                        Search by Cost
                    </button>
                </div>
            </div>

            {selectedOption === 'Search by Date' && (
                <div className='dropdown-container'>
                    <h4>Select Date Range:</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date:</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                className="form-control"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date:</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <button type="button" onClick={handleDateSearch} className="dropdown-button">
                                Search
                            </button>
                        </div>

                        <div>
                            {data1.map((item) => (
                                <div className='dropdown-container' key={item.departureId}>
                                    <p>Departure Date: {item.departDate}</p>
                                    <p>Return Date: {item.endDate}</p>
                                    <p>Number of Days: {item.numberOfDays}</p>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            setSelectedPkgId(item.pkgId);
                                            fetchAdditionalData(item.pkgId);
                                        }}
                                        className='dropdown-button'
                                    >
                                        Select Package
                                    </button>
                                </div>
                            ))}
                        </div>

                        <hr />

                        <div>
                            {selectedPkgId && data3.pkgId && (
                                <div>
                                    <h2 style={{ textAlign: 'center' }}>Package Info</h2>
                                    <h3>Tour name: {data5.catName}</h3>
                                    <h3>pkg name: {data3.pkgName}</h3>
                                    <button onClick={() => { console.log('Button clicked!'); navigate(`/bycostMasterId/${data3.pkgId}`); }} className='dropdown-button1'>View Details</button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            )}

            {selectedOption === 'Search by Name' && (
                <div className='dropdown-container1'>
                    <h4>Enter Name:</h4>
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <button type="button" onClick={fetchDataByName} className="dropdown-button">
                        Search
                    </button>
                    <div className='dropdown-container2'>
                        {data.map((item) => (
                            <div key={item.
                              index
                              }>
                                <p>Tour id: {item.subCat_id}</p>
                                <p>Tour name: {item.subCat_name}</p>
                                <button onClick={() => navigate(`/bypkgId/${item.subCat_id}`)} className="dropdown-button">View Details</button>
                                
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedOption === 'Search by Cost' && (
                <div className='dropdown-container1'>
                    <h4>Enter Cost:</h4>
                    <input
                        type="number"
                        placeholder="Enter cost"
                        value={searchCost}
                        onChange={(e) => setSearchCost(e.target.value)}
                    />
                    <button onClick={fetchDataByCost} className="dropdown-button">
                        Search by Cost
                    </button>
                    <div className='dropdown-container2'>
                        
                            <div key={data2.
                              index
                              }>
                                <p>Tour id: {data2.subCat_id}</p>
                                <p>Tour name: {data2.subCat_name}</p>
                                <button onClick={() => navigate(`/bypkgId/${data2.subCat_id}`)} className="dropdown-button">View Details</button>
                                
                            </div>
                      
                    </div>

                    <div className='dropdown-container'>
                        {selectedPkgId1 && data4.pkgId && (
                            <div>
                                <h2 style={{ textAlign: 'center' }}>Package Info</h2>
                                <h3>Tour name: {data6.catName}</h3>
                                <h3>pkg name: {data4.pkgName}</h3>
                                <button onClick={() => { console.log('Button clicked!'); navigate(`/bycostMasterId/${data4.pkgId}`); }} className='dropdown-button1'>View Details</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchDropdown;
























// //import styles from './Dropdown.css'; // Import the CSS modul
//   import axios from 'axios'; // Import the axios library for making API requests
//   import { useParams, useNavigate } from 'react-router-dom';
//   import React, { useState, useEffect } from 'react';  
// import { Button } from 'react-bootstrap';
// import './SearchDropdown.css'



//   const SearchDropdown = () => {
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [data, setData] = useState([]);
//     const [data1, setData1] = useState([]);
//     const [searchName, setSearchName] = useState(''); 
//     const [data2, setData2] = useState([]);
//     const [data3, setData3] = useState([]);
//     const [data4, setData4] = useState([]);
//     const [data5, setData5] = useState([]);
//     const [data6, setData6] = useState([]);
//     const [searchCost, setSearchCost] = useState('');
//     const [selectedPkgId, setSelectedPkgId] = useState('');
//   const [selectedPkgId1, setSelectedPkgId1] = useState('');
//   const [selectedPkgId3, setSelectedPkgId3] = useState('');
//   const [selectedPkgId2, setSelectedPkgId2] = useState('');

//   let navigate = useNavigate();

//     const handleOptionSelect = (option) => {
//       setSelectedOption(option);
//       if (option === 'Search by Date') {
//         setData1([])
//       } else if (option === 'Search by Name') {
//         setData([]) 
//       } else if (option === 'Search by Cost') {
//         setData2([]) 
//       }else if (data3.length >0) {
//         setData3([]) 
//       }
//         console.log("Option selected:", option); // Add this line
   
//   }
//     const fetchDataByName = async () => {
//       try {
      
        
//         const response = await axios.get("https://localhost:8080/bycatId/"+searchName);
    
//         setData(response.data);
        
//       } catch (error) {
//         console.error('Error fetching data by name:', error);
//       }
//     };

   

//   const fetchDataByCost = async () => {
//     try {
//      console.log(searchCost);
//       const response2 = await fetch("https://localhost:8080/cost/bycost/"+searchCost);
//       const datahere = await response2.json();
//       const catidd = datahere[0].catMasterId;
//       const response4 = await fetch("https://localhost:8080/api/Category/"+catidd);
//       const response = await response4.json();
//       setData2(response.catMasterId);
      
//     } catch (error) {
//       console.error('Error fetching data by cost:', error);
//     }
//   };

//   const fetchAdditionalData = async (pkgId) => {
//     try {
    
//       const response = await axios.get("http://localhost:8080/api/package_master/"+pkgId);
//       setData3(response.data);
//       //console.log(data3)
//     } catch (error) {
//       console.error('Error fetching additional data:', error);
//     }
//   };



//   const fetchAdditionalData2 = async (catMasterId) => {
//     try {
    
//       const response1= await axios.get("http://localhost:8080/api/category_master/bycatMasterId/"+catMasterId);
      
//       setData5(response1.data);
      
      
   
//     } catch (error) {
//       console.error('Error fetching additional data:', error);
//     }
//   };


//   useEffect(() => {
//     if (selectedPkgId && data3.pkgId) {
//       setSelectedPkgId2(data3.catMasterId);
//       fetchAdditionalData2(data3.catMasterId);
//     }
//   }, [data3, selectedPkgId]);











//   const fetchAdditionalData1 = async (pkgId) => {
//     try {
    
//       const response = await axios.get("http://localhost:8080/api/package_master/"+pkgId);
//       setData4(response.data);
     
   
//     } catch (error) {
//       console.error('Error fetching additional data:', error);
//     }
//   };

//   useEffect(() => {
//     if (selectedPkgId1 && data4.pkgId) {
//      // console.log(data4.catMasterId)
//       setSelectedPkgId3(data4.catMasterId);
//       fetchAdditionalData3(data4.catMasterId);
//     }
//   }, [data4, selectedPkgId1]);


//   const fetchAdditionalData3 = async (catMasterId) => {
//     try {
    
//       const response2= await axios.get("http://localhost:8080/api/category_master/bycatMasterId/"+catMasterId);
//       setData6(response2.data);
      
//       //console.log(data6)
   
//     } catch (error) {
//       console.error('Error fetching additional data:', error);
//     }
//   };


 




//   const handleDateSearch = async () => {
//         try {
//           // Make an API request to fetch data based on selected start and end dates
//           const response = await axios.get("https://localhost:8080/date/bydate/"+startDate+"/"+endDate);
//           setData1(response.data);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//     };


//     return (
//   <div>
//         <h3>Search Options:</h3>
//         <div className='dropdown-container'> {/* Use the scoped class name */}

//           <div className="dropdown-button-wrapper">
//             <button onClick={() => handleOptionSelect('Search by Date')} className='dropdown-button'>
//               Search by Date
//             </button>
//           </div>

//           <div className="dropdown-button-wrapper">
//             <button onClick={() => handleOptionSelect('Search by Name')} className='dropdown-button'>
//               Search by Name
//             </button>
//           </div>

//           <div className="dropdown-button-wrapper">
//             <button onClick={() => handleOptionSelect('Search by Cost')} className='dropdown-button'>
//               Search by Cost
//             </button>
//           </div>
//         </div>




//         {selectedOption === 'Search by Date' && (
//           <div className='dropdown-container'> {/* Use the scoped class name */}
//             <h4>Select Date Range:</h4>
//             <form>

//               <div className="form-group">
//                 <label htmlFor="startDate">Start Date:</label>
//                 <input
//                   type="date"
//                   id="startDate"
//                   name="startDate"
//                   className="form-control"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//               </div>

              
//               <div className="form-group">
//                 <label htmlFor="endDate">End Date:</label>
//                 <input
//                   type="date"
//                   id="endDate"
//                   name="endDate"
//                   className="form-control"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <button type="button" onClick={handleDateSearch} className="dropdown-button">
//                 Search
//                 </button>
//               </div>



//               <div >
//                {data1.map((item) => (
//                <div className='dropdown-container' key={item.departureId}>
//               <p>Departure Date: {item.departDate}</p>
//               <p>Return Date: {item.endDate}</p>
//               <p>Number of Days: {item.numberOfDays}</p>
//               <button
//               type="button"
//               onClick={async () => {
//               setSelectedPkgId(item.pkgId);
//               fetchAdditionalData(item.pkgId);
             
//               }}
//                className='dropdown-button'
//                >
//               Select Package
//             </button>

//             </div>
//             ))}
//             </div>

            
//             <hr />

//            <div >
//            {selectedPkgId && data3.pkgId && (
//            <div>
            
//             <h2 style={{ textAlign: 'center' }}>Package Info</h2>
//             <h3>Tour name: {data5.catName}</h3>
//             <h3>pkg name: {data3.pkgName}</h3>
            
//             <button onClick={() => { console.log('Button clicked!'); navigate(`/bycostMasterId/${data3.pkgId}`); }} className='dropdown-button1'>View Details</button>

           
              
//             </div>
//             )}
//           </div>


      
//           </form>
//         </div>
//         )}





//         {selectedOption === 'Search by Name' && (

//         <div className='dropdown-container1'>
//             <h4>Enter Name:</h4>
//             <input
//               type="text"
//               value={searchName}
//               onChange={(e) => setSearchName(e.target.value)}
//             />

//             <button type="button" onClick={fetchDataByName} className="dropdown-button">
//               Search
//             </button>

//           <div className='dropdown-container2'>
//              {data.map((item) => (
//             <div key={item. catMasterId}>
//               <p>Tour id: {item.catMasterId}</p>
//               <p>Tour name: {item.catName}</p>
//               <button onClick={()=>navigate(`/bypkgId/${item.catMasterId}`)} className="dropdown-button">View Details</button>
//             </div> 
//             ))}
//           </div>
//         </div>
//         )}


// {selectedOption === 'Search by Cost' && (

//     <div className='dropdown-container1'>
//         <h4>Enter Cost:</h4>
//         <input
//           type="number"
//           placeholder="Enter cost"
//           value={searchCost}
//           onChange={(e) => setSearchCost(e.target.value)}
//         />


//         <button onClick={fetchDataByCost} className="dropdown-button">
//           Search by Cost
//         </button>

//         <div >
//          {data2.map((item) => (
//           <div key={item.costId}>
//             <p>pkg Id: {item.pkgId}</p>
//             <p>Cost: {item.cost}</p>
            
//             <button
//               type="button"
//               onClick={async () => {
//               setSelectedPkgId1(item.pkgId);
//               fetchAdditionalData1(item.pkgId);
//               }}
//                className='dropdown-button'
//                >
//               Select Package
//             </button>
//             <hr />
//           </div>
//          ))}
//         </div>

//           <div className='dropdown-container'>
//            {selectedPkgId1 && data4.pkgId && (
//            <div>
            
//             <h2 style={{ textAlign: 'center' }}>Package Info</h2>
//             <h3>Tour name: {data6.catName}</h3>
//             <h3>pkg name: {data4.pkgName}</h3>
            

//             <button onClick={() => { console.log('Button clicked!'); navigate(`/bycostMasterId/${data4.pkgId}`); }} className='dropdown-button1'>View Details</button>


//             </div>
//             )}
//           </div>

        
//     </div> 
// )} 




//  </div>
//   )
// }

//   export default SearchDropdown;