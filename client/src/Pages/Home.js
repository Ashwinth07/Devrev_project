import React from 'react';
import './Home.css';
import Navbars from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbars />
      <div className="img-container">
        <img
          className="img-fluid"
          src="https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
        />
      </div>
      <div className="container">
        <div className="hero text-center">
          <h1>Food is our common ground, a universal experience worth savoring.</h1>
          <br />
          <p>Choose your Bookings</p>
          <a className="btn btn-secondary" onClick={() => navigate('/bookfood')}>
            Book now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
