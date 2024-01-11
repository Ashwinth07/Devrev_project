import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import Navbars from '../../components/Navbar';
import moment from 'moment';

function Manage() {
  const [users, setUsers] = useState([]);
  const [multiplier, setMultiplier] = useState('');
  const [total, setTotal] = useState(0);
  const [cancelMessage, setCancelMessage] = useState('');
  const [searchId, setSearchId] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalForToday, setTotalForToday] = useState([]);
  const isAdmin = localStorage.getItem('admin') === 'true';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/register');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchUserData();
    const calculateTotalForToday = () => {
      const today = moment().format('YYYY-MM-DD');
      const todayUsers = users.filter(user => moment(user.lastDailyUpdate).format('YYYY-MM-DD') === today);
      const todayFoodCount = todayUsers.reduce((acc, user) => acc + 1, 0);
      setTotalForToday(todayFoodCount);
    };

    calculateTotalForToday();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.put('http://localhost:4000/api/auth/users/updatecost', {
        newCostAllocated: Number(multiplier),
      });
      alert("successfully allocated");
      const newTotal = users.reduce((acc, user) => acc + user.dailyFoodCount * Number(multiplier), 0);
      setTotal(newTotal);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  const handleCancelBooking = async (userId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel the booking?');
    if (confirmCancel) {
      try {
        const response = await axios.put(`http://localhost:4000/api/auth/users/${userId}/decrement`);
        console.log(response.data);
        const updatedUsers = users.map(user =>
          user._id === userId ? { ...user, dailyFoodCount: user.dailyFoodCount - 1 } : user
        );
        setUsers(updatedUsers);
        setCancelMessage('Booking canceled successfully!');
      } catch (error) {
        console.error('Error canceling booking:', error);
        setCancelMessage('Failed to cancel booking');
        
      }
    } else {

      setCancelMessage('Cancellation declined');
    }
  };
  const handleSearch = () => {
    if (searchId.trim() !== '') {
      const filtered = users.filter(user => user.employeeId.includes(searchId.trim()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };
  const handleBulkUpload = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/month/bulk-upload');
      alert("Successfully uploaded")
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };
  const updatefoodcount = async()=>{
    try {
      const response = await axios.put('http://localhost:4000/api/auth/users/update');
      alert("Successfully reseted");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  }
  return (
    <div className="container-fluid">
      <Navbars />
      {isAdmin ? (
        <div className='m-2' 
         style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                width: "48%",
                height: "400px",
              }}>
         <article className="card-body">
            <h5 className="card-title">Order statistics</h5>
            <iframe
              style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                width: "200%",
                height: "400px",
              }}
              src="https://charts.mongodb.com/charts-foodbook-vmszc/public/dashboards/659cbe14-4a25-4074-8176-a42cb33d1809"
            ></iframe>
          </article> 
          </div>
      ) : (<p></p>)}
      {isAdmin ? (
      <div>
      <p className="font-weight-bold mt-3" style={{ color: cancelMessage ? 'green' : 'red', textAlign: "center" }}>{cancelMessage}</p>
      <p className='m-2 mt-5 font-weight-bold'>Total Food Count for Today: {totalForToday}</p>
      </div>
      ) : (<p></p>)}
      <div className="row">
      {isAdmin ? (
        <div className="col-md-6 col-lg-4">
        
          <Form className="d-flex align-items-center mt-4">
            <Form.Group className='m-2 mr-2'>
              <Form.Control type="number" placeholder="Enter the Amount" value={multiplier} onChange={e => setMultiplier(e.target.value)} />
            </Form.Group>
            <Button variant="primary" className='m-2' onClick={handleSubmit}>Submit</Button>
          </Form>
          <p className='m-2 mt-5 font-weight-bold'>Total: {total}</p>
        </div>
        ) : (<p></p>)}
        <div className="col-md-6 col-lg-8 mt-4 mt-md-0">
          <div className="row align-items-center">
            <div className="col-8 col-md-6">
            {isAdmin ? (
              <Form.Group className='m-2'>
                <Form.Control type="text" placeholder="Search by Employee ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
              </Form.Group>
              ) : (
        <p></p>
            )}
            </div>
            {isAdmin ? (
                <div className="col-4 col-md-3">
                  <Button variant="primary" onClick={handleSearch} className=''>Search</Button>
                </div>
             ) : (<p></p>)}
                {isAdmin ? (
                <div className="col-12 col-md-3 mt-3 mt-md-0 text-md-right">
                  <Button variant="info" onClick={handleBulkUpload} className='m-2'>Bulk Upload to DB</Button>
                  <Button variant="info" onClick={updatefoodcount} className='m-2'>Reset Food Count</Button>
                </div>
            ) : (<p></p>)}
            
          </div>
        </div>
      </div>
      

      <div className='m-2 mt-4'>
        {isAdmin ? (
          <Table striped bordered hover responsive>
            <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Daily Food Count</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {(filteredUsers.length > 0 ? filteredUsers : users).map(user => (
                  <tr key={user._id}>
                    <td>{user.employeeId}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.dailyFoodCount}</td>
                    <td>{user.dailyFoodCount * Number(multiplier)}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleCancelBooking(user._id)}>x</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </Table>
        ) : (
          <p>Admin access required.</p>
        )}
      </div>
    </div>
  );
}

export default Manage;
