import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Navbars from '../components/Navbar';
// import { Jumbotron, Button } from 'react-bootstrap';
function Home() {
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const navigates=useNavigate();
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(date)
    axios.get(`http://localhost:4000/api/flight/get/${date}`).then((res)=>{
      setData([...res.data])
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  };

  function handleClick(event) {
    navigates('/bookingpage', { state: { myValue:event.target.value } });
  }
  const displayAllData = data.map((x, index) => 
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
             <button type="submit" className="btn btn-primary" value={x._id} onClick={handleClick}>Book now</button>
          </div>
        </div>
  </div>
  )
  return (
    <div>
       <Navbars></Navbars>

      {/* <Jumbotron>
        <h1>Welcome to our Flight Booking App!</h1>
        <p>
          We provide a simple and easy-to-use platform for booking your next flight.
        </p>
        <p>
          <Button variant="primary" href="/search">Search Flights</Button>
        </p>
      </Jumbotron> */}
    <div className='py-5 m-2'  style={{backgroundColor:"#dee2e6"}}>
       <form className="form-inline" onSubmit={handleSubmit}>
          <div className="form-row mb-3">
            <div className="col-3" style={{width:"150px",marginLeft:"100px",height:"100px"}}>
              <h6>DepartureDate</h6>
              <input type="date" value={date} onChange={handleDateChange} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mb-3" style={{position:"absolute",right:20}}>Search</button>
        </form>
    </div>
    <div>
      {displayAllData}
    </div>
    </div>
  );
}
  
export default Home;