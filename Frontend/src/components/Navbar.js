// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import '../styles/Navbar.css'; // Import Navbar styles

const Navbar = ({ loggedIn, onShowLoginForm, onShowSignupForm, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-right">
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <ul>
          {!loggedIn && <li><button onClick={onShowLoginForm}>Login</button></li>}
          {!loggedIn && <li><button onClick={onShowSignupForm}>Signup</button></li>}
          {loggedIn && <li><LogoutButton setLoggedIn={onLogout} /></li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
