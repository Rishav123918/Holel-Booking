
import "./list.css";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [minC, setMinC] = useState(0);
  const [maxC, setMaxC] = useState(999);
  const [obj, setObj] = useState(location.state.obj);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels/byCityAndPriceRange?city=${destination}&minC=${minC}&maxC=${maxC}`
  );
  // console.log("data are:",data);

  useEffect(() => {
    // Update the destination, date, and options when the location state changes
    setDestination(location.state.destination);
    setDates(location.state.dates);
    setOptions(location.state.options);
    setObj(location.state.obj);
    console.log(obj); // It's working
  }, [location.state]);

  const handleClick=()=>{
    reFetch();
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    value={minC}
                    onChange={(e) => setMinC(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    value={maxC}
                    onChange={(e) => setMaxC(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          
          <div className="listResult">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              data.map((item) => <SearchItem item={item} objectt={obj} key={item._id} />)
            )}
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default List;


// import "./list.css";
// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Header from "../../components/header/Header";
// import { useLocation } from "react-router-dom";
// import { format } from "date-fns";
// import { DateRange } from "react-date-range";
// import SearchItem from "../../components/searchItem/SearchItem";
// import useFetch from "../../hooks/useFetch";

// const List = () => {
//   const location = useLocation();
//   const [destination, setDestination] = useState(location.state.destination);
//   const [date, setDate] = useState(location.state.date);
//   const [openDate, setOpenDate] = useState(false);
//   const [options, setOptions] = useState(location.state.options);
//   const [minC, setMinC] = useState(0);
//   const [maxC, setMaxC] = useState(999);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `/hotels?city=${destination}&minC=${minC}&maxC=${maxC}`
//       );
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch data.");
//       }
  
//       const data = await response.json();
//       console.log("data are adsf",data); // Check the response data in the console
//       setData(data);
//       setLoading(false);
//     } catch (error) {
//       setError(error);
//       setLoading(false);
//       console.error("Error fetching data:", error);
//     }
//   };
  

//   useEffect(() => {
//     // Update the destination, date, and options when the location state changes
//     setDestination(location.state.destination);
//     setDate(location.state.date);
//     setOptions(location.state.options);
//   }, [location.state]);

//   const handleClick = () => {
//     fetchData();
//   };

//   return (
//     <div>
//       <Navbar />
//       <Header type="list" />
//       <div className="listContainer">
//         <div className="listWrapper">
//           <div className="listSearch">
//             <h1 className="lsTitle">Search</h1>
//             <div className="lsItem">
//               <label>Destination</label>
//               <input placeholder={destination} type="text" />
//             </div>
//             <div className="lsItem">
//               <label>Check-in Date</label>
//               <span onClick={() => setOpenDate(!openDate)}>
//                 {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
//                   date[0].endDate,
//                   "MM/dd/yyyy"
//                 )}`}
//               </span>
//               {openDate && (
//                 <DateRange
//                   onChange={(item) => setDate([item.selection])}
//                   minDate={new Date()}
//                   ranges={date}
//                 />
//               )}
//             </div>
//             <div className="lsItem">
//               <label>Options</label>
//               <div className="lsOptions">
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">
//                     Min price <small>per night</small>
//                   </span>
//                   <input
//                     type="number"
//                     className="lsOptionInput"
//                     value={minC}
//                     onChange={(e) => setMinC(e.target.value)}
//                   />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">
//                     Max price <small>per night</small>
//                   </span>
//                   <input
//                     type="number"
//                     className="lsOptionInput"
//                     value={maxC}
//                     onChange={(e) => setMaxC(e.target.value)}
//                   />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">Adult</span>
//                   <input
//                     type="number"
//                     min={1}
//                     className="lsOptionInput"
//                     placeholder={options.adult}
//                   />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">Children</span>
//                   <input
//                     type="number"
//                     min={0}
//                     className="lsOptionInput"
//                     placeholder={options.children}
//                   />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">Room</span>
//                   <input
//                     type="number"
//                     min={1}
//                     className="lsOptionInput"
//                     placeholder={options.room}
//                   />
//                 </div>
//               </div>
//             </div>
//             <button onClick={handleClick}>Search</button>
//           </div>
//           <div className="listResult">
//             {/* {loading ? (
//               <div>Loading...</div>
//             ) : error ? (
//               <div>Error: {error.message}</div>
//             ) : (
//               data.map((item) => <SearchItem item={item} key={item._id} />)
//             )} */}

//             { loading ? "loading" :<>
//             {data.map(item=>(
//               <SearchItem item={item} key={item._id}/>
//             ))}
            
//             </>

//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default List;


