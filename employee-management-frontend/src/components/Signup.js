// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

const Signup = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '', roles: [] });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'roles') {
            setUser({ ...user, roles: [value] }); // Only set the selected role as an array
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', user);
            setMessage(response.data.message);
            // Display success message
            window.alert('Login successful!');

            // Redirect to login page after successful signup
            navigate('/login');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} required />
                </div>
                <div>
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
                </div>
                <div>
                <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
                </div>
                <label>
                    Choose Role:
                    <select name="roles" onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="ROLE_USER" selected={user.roles.includes("ROLE_USER")}>User</option>
                        <option value="ROLE_MODERATOR" selected={user.roles.includes("ROLE_MODERATOR")}>Moderator</option>
                        <option value="ROLE_ADMIN" selected={user.roles.includes("ROLE_ADMIN")}>Admin</option>
                    </select>
                </label>
                <div>
                <button type="submit">Signup</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
