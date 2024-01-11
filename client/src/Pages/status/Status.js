import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbars from '../../components/Navbar.js';

function Status() {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/auth/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const calculateTotalCost = () => {
    if (userData) {
      return userData.data.dailyFoodCount * userData.data.costallocated;
    }
    return 0;
  };

  return (
    <div>
      <Navbars />
      <div className='container'>
        <div className='mt-4'>
          {userData ? (
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Booked Status</h5>
                <br></br>
                <p className='card-text'>Food Ordered Count: {userData.data.dailyFoodCount}</p>
                <p className='card-text'>Total Cost: {calculateTotalCost()}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Status;
