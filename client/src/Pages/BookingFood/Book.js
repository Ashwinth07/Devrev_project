import React, { useEffect, useState } from 'react';
import Navbars from '../../components/Navbar';
import Foodcount from './Foodcount';
import axios from 'axios';
import './Book.css';

function Book() {
  const userId = localStorage.getItem('id');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/register');
        const users = response.data;

        const today = new Date().toISOString().split('T')[0];
        setTodayDate(today); // Set today's date
        for (let i = 0; i < users.length; i++) {
          const dateObj = new Date(users[i].lastDailyUpdate);
          const year = dateObj.getFullYear();
          const month = dateObj.getMonth() + 1;
          const day = dateObj.getDate();
          const checkday = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
          if (users[i]._id === userId && checkday === today) {
            setEmployeeDetails({
              id: users[i].employeeId,
              name: users[i].name,
              mealsBooked: 'Meals Booked Today',
            });
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <Navbars />
      <h1 className="text-center mt-4">Book Your Food Today</h1>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <Foodcount userId={userId} />
          {employeeDetails && (
            <div className="card mt-4" >
              <div className="card-body">
                <h2 className="card-title">Employee Details</h2>
                <p className="card-text">Employee ID: {employeeDetails.id}</p>
                <p className="card-text">Name: {employeeDetails.name}</p>
                <p className="card-text">Meals Booked: {employeeDetails.mealsBooked}</p>
                <p className="card-text">Today's Date: {todayDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Book;
