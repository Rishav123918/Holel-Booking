

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import "./reserve.css"
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
// import useFetch from "../../hooks/useFetch"
// import { useContext, useState } from "react"
// import { SearchContext } from "../../context/SearchContext"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"


// const Reserve = ({setOpen,hotelId})=>{
//     const [selectedRooms,setSelectedRooms]=useState([])
//     const {data,loading,error}=useFetch(`/hotels/room/${hotelId}`)
//     const [userName, setUserName] = useState("");
//     const { dates } = useContext(SearchContext)
    
//     const getDatesInRange = (startDate,endDate)=>{
//       const start=new Date(startDate)
//       const end=new Date(endDate)
//       const date = new Date(start.getTime());
  
//       // let list=[]
//       const dates=[]
  
//       while(date<=end){
//           //list.push(new Date(date))
//           dates.push(new Date(date).getTime())
//           date.setDate(date.getDate()+1)
//       }
//       return dates;
//     } 
//     const alldates= getDatesInRange(dates[0].startDate,dates[0].endDate)
    
//     const isAvailable=(roomNumber)=>{
//       const isFound = roomNumber.unavailableDates.some((date)=>
//          alldates.includes(new Date(date).getTime())
//       )
//       return !isFound
//     }

//     const handleSelect = (e)=>{
//       const checked=e.target.checked;
//       const value=e.target.value;
//       setSelectedRooms(
//         checked
//         ? [...selectedRooms,value]
//         : selectedRooms.filter((item) => item !== value)
//       )
//     }

//     const navigate = useNavigate()
//     // console.log(selectedRooms)
//     const handleClick = async ()=>{
//       try{
//         await Promise.all(
//            selectedRooms.map((roomId)=>{
//             const res=axios.put(`/rooms/availability/${roomId}`,{dates:alldates})
//             return res.data
//         }));
//         setOpen(false)
//         navigate("/")
//         setShowConfirmation(true);
//       }catch(err){
         
//       }
//     }
//     return(
//         <div className="reserve">
//           {showConfirmation ? (
//         <ReservationConfirmation userName={userName} selectedRooms={selectedRooms} /> 
//       ) : (
//              <div className="rContainer">
//                  <FontAwesomeIcon
//                   icon={faCircleXmark}
//                   className="rClose"
//                   onClick={()=>setOpen(false)}
//                 />
//                 <span>Select your rooms:</span>
//                   {data.map((item)=>(
//                     <div className="rItem">
//                         <div className="rItemInfo">
//                             <div className="rTitle">{item.title}</div>
//                             <div className="rDesc">{item.desc}</div>
//                             <div className="rMax">
//                               Max people: <b>{item.maxPeople}</b>
//                             </div>
//                             <div className="rPrice">{item.price}</div>
//                         </div>
//                         <div className="rSelectRooms">
//                         {item.roomNumbers.map((roomNumber)=>(
//                                 <div className="room">
//                                   <label>{roomNumber.number}</label>
//                                   <input 
//                                   type="checkbox" 
//                                   value={roomNumber._id} 
//                                   onChange={handleSelect}
//                                   disabled={!isAvailable(roomNumber)}
//                                   />
//                                 </div>
//                             ))} 
//                             </div>
//                     </div>
//                   ))}
//                    <button onClick={handleClick} className="rButton">Reserve Now!</button>
//              </div> 
//              )}
//              </div>         
//     )
// }

// export default Reserve


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./reserve.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../hooks/useFetch"
import { useContext, useEffect, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"

const Reserve = ({setOpen,hotelId, objectt})=>{
    const [selectedRooms,setSelectedRooms]=useState([])
    const {data,loading,error}=useFetch(`/hotels/room/${hotelId}`)
    const { dates } = useContext(SearchContext)

    console.log(objectt);

    const getDatesInRange = (startDate,endDate)=>{
      const start=new Date(startDate)
      const end=new Date(endDate)
      const date = new Date(start.getTime());
  
      const dates=[]
  
      while(date<=end){
          //list.push(new Date(date))
          dates.push(new Date(date).getTime())
          date.setDate(date.getDate()+1)
      }
      return dates;
    } 
    const alldates= getDatesInRange(dates[0].startDate,dates[0].endDate)
    
    const isAvailable=(roomNumber)=>{
      const isFound = roomNumber.unavailableDates.some((date)=>
         alldates.includes(new Date(date).getTime())
      )
      return !isFound
    }

    const handleSelect = (e)=>{
      const checked=e.target.checked;
      const value=e.target.value;
      setSelectedRooms(
        checked
        ? [...selectedRooms,value]
        : selectedRooms.filter((item) => item !== value)
      )
    }

    const navigate = useNavigate()
    console.log(selectedRooms)

    const handleClick = async ()=>{
      try{
        console.log('before making request')
        const room = {hotelId, selectedRooms};
        // console.log(obj);
        await Promise.all(
          selectedRooms.map(async (roomId) => {
            const res = await axios.put(`/rooms/availability/${roomId}`, {
              dates: alldates,
              obj: objectt,  // Include the object in the request body
              roomData: room
            });
            return res.data;
          })
        );
        
        console.log('after making request');
        setOpen(false)
        navigate("/")
      }catch(err){
         
      }
    }

   
    
    return(
        <div className="reserve">
             <div className="rContainer">
                 <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="rClose"
                  onClick={()=>setOpen(false)}
                />
                <span>Select your rooms:</span>
                  {data.map((item)=>(
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                              Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                        {item.roomNumbers.map((roomNumber)=>(
                                <div className="room">
                                  <label>{roomNumber.number}</label>
                                  <input 
                                  type="checkbox" 
                                  value={roomNumber._id} 
                                  onChange={handleSelect}
                                  disabled={!isAvailable(roomNumber)}
                                  />
                                </div>
                            ))} 
                            </div>
                    </div>
                  ))}
                   <button onClick={handleClick} className="rButton">Reserve Now!</button>
             </div> 
             </div>         
    )
}

export default Reserve
