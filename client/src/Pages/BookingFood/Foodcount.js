import React, { useState } from 'react';
import axios from 'axios';
import './Book.css'

function Foodcount({ userId }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleIncrement = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/auth/users/${userId}/increment`);
      setSuccess(true);
      window.location.reload();
      console.log(response.data); 
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container">
        {error && <p className="error-message">Message: {error}</p>}
        {success ? (
            <p className="success-message">Daily count incremented successfully!</p>
        ) : (
            <button onClick={handleIncrement} className="increment-button">
            Book Food
            </button>
        )}
    </div>
  );
}

export default Foodcount;
