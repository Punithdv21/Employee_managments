import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginFrom.css'; // Import the CSS file for LoginForm styling

const LoginForm = ({ setUserRole, setLoggedIn, setUsername }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', { username: usernameInput, password });

      // Debug: Log the response data
      console.log('Login successful:', response.data);

      // Store token and username in local storage
      const token = response.data.accessToken;
      const username = response.data.username;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('username', username);

      // Store roles in local storage
      const userRole = response.data.roles.includes('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER';
      localStorage.setItem('userRole', userRole);

      // Debug: Log the stored userRole
      console.log('Stored userRole:', userRole);

      // Set userRole and loggedIn state
      setUserRole(userRole);
      setLoggedIn(true);
      setUsername(username); // Update the username state in HomePage

      // Display success message
      window.alert('Login successful!');

      // Redirect to home page
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred while logging in');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} className="login-input" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" required />
        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LoginForm;
