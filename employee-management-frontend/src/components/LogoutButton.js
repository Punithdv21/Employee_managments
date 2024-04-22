// LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const LogoutButton = ({ setLoggedIn }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setLoggedIn(false);
    navigate('/'); // Redirect to the home page after logout
  };


  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
