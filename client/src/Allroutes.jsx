import React from 'react'
// import Navbar from './components/Navbar'
import Navbars from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup/Signup.js';
import Login from './Pages/Login/Login';
import { Authentication } from './Utilis/Authentication';
import Bookingpage from './Pages/Bookingpage/Bookingpage';
import Flight from './Pages/flight/Flight.js';
import Addflight from './Pages/AddFlight/Addflight';
import Aboutus from './Pages/Aboutus';



function Allroutes() {
  return (
    <div>
       
        <Authentication>
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/bookingpage" element={<Bookingpage/>} />
            <Route path="/viewflight" element={<Flight/>} />
            <Route path="/addflight" element={<Addflight/>} />
            <Route path="/aboutus" element={<Aboutus/>} />
        </Routes>
        </Authentication>
    </div>
  )
}

export default Allroutes