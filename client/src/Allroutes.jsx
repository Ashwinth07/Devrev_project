import React from 'react'
// import Navbar from './components/Navbar'
import Navbars from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup/Signup.js';
import Login from './Pages/Login/Login';
import { Authentication } from './Utilis/Authentication';
import Aboutus from './Pages/Aboutus';
import Footer from './Pages/Footer/Footer';
import Book from './Pages/BookingFood/Book.js';
import Manage from './Pages/Admin/Manage.js';
import Status from './Pages/status/Status.js'


function Allroutes() {
  return (
    <div>
       
        <Authentication>
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/aboutus" element={<Aboutus/>} />
            <Route path="/bookfood" element={<Book></Book>}/>
            <Route path="/managefood" element={<Manage/>}/>
            <Route path="/status" element={<Status/>}/>
        </Routes>
        </Authentication>
        <br></br>
        <Footer></Footer>
    </div>
  )
}

export default Allroutes