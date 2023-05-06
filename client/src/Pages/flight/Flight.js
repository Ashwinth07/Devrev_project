import React, { useEffect, useState } from 'react'
import Navbars from '../../components/Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Flight() {
    const navigates=useNavigate();
    const[List, setList] = useState([])
    useEffect(() => {
            axios.get('http://localhost:4000/api/flight/get')
            .then((response) => {setList(response.data)})
            .catch((error) => console.log(error))    
        },[]
    )
    function handleClick(event) {
        navigates('/bookingpage', { state: { myValue:event.target.value } });
      }
    function Delete(event) {
        axios.delete(`http://localhost:4000/api/flight/${event.target.value}`).then((res)=>{
            alert("Successfully deleted");
          }).catch((err)=>{
            console.log(err);
          })
          axios.get('http://localhost:4000/api/flight/get')
          .then((response) => {setList(response.data)})
          .catch((error) => console.log(error))
      }
    const displayAllData = List.map((x, index) => 
    <div key = {index} className='flight-container m-3' >
        <div className='d-flex gap-4 p-3 row justify-content-center text-center align-items-center'>
            <div className='col-1'>
            <h6>{x.airlineName}</h6>
            <p>{x.flightNumber}</p>
            </div>
            <div className='col-2'>
              <h5>{x.departureDate}</h5>
              <p>{x.departureAirport.name}</p>
            </div>
            <div className='col-2'>
              <h1>---------</h1>
              <p style={{textAlign:"center"}}>Non Stop</p>
            </div>
            <div className='col-2'>
              <h5>{x.arrivalDate}</h5>
              <p>{x.arrivalAirport.name}</p>
            </div>
            <div className='col-1'>
              <h6> ₹ {x.price}</h6>
            </div>
            <div className='col-2'>
               <button type="submit" className="btn btn-primary g" value={x._id} onClick={handleClick}>Book now</button>

               {localStorage.getItem("admin")=="true" && (
                   <div>
                    <br></br>
                   <button type="submit" className="btn btn-primary" value={x._id} onClick={Delete}>Delete</button>
                   </div>
               )}
               
            </div>
          </div>
    </div>
    )
  return (
    <div>
        <Navbars></Navbars>
        {displayAllData}
    </div>
  )
}

export default Flight