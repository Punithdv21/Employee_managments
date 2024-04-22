import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Signup from '../components/Signup';
import Navbar from '../components/Navbar';
import AddEmployee from '../EmployeeCrud/AddEmployee';
import ViewEmployees from '../EmployeeCrud/ViewEmployees';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showViewEmployees, setShowViewEmployees] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (role, username) => {
    setUserRole(role);
    setUsername(username);
    setLoggedIn(true);
    console.log('User role after login:', role); // Debug statement
    console.log('Username after login:', username); // Debug statement
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleShowSignupForm = () => {
    setShowLoginForm(false);
    setShowSignupForm(true);
  };

  console.log('Current username:', username); // Debug statement
  console.log('Current userRole:', userRole); // Debug statement

  return (
    <div className="home-page-container">
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} onShowLoginForm={handleShowLoginForm} onShowSignupForm={handleShowSignupForm} />
      {loggedIn && (
        <div className="logged-in-message">
          <h2>Welcome back, {username}!</h2>
        </div>
      )}
      {!loggedIn ? (
        <div>
          {showLoginForm && <LoginForm setUserRole={handleLogin} setLoggedIn={setLoggedIn} setUsername={setUsername} />}
          {showSignupForm && <Signup />}
          {!showLoginForm && !showSignupForm && (
            <div className="welcome-message">
              <h2>Welcome to the Home Page!</h2>
              <p className="feature-message">Please login or signup to access the features.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="button-box">
            <button onClick={() => { setShowViewEmployees(true); setShowAddEmployee(false); }}>View Employees</button>
            <button onClick={() => { setShowAddEmployee(true); setShowViewEmployees(false); }}>Add Employee</button>
          </div>
          {showViewEmployees && <ViewEmployees />}
          {showAddEmployee && <AddEmployee />}
        </div>
      )}
    </div>
  );
};

export default HomePage;
