import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddEmployee.css';

const AddEmployee = ({ fetchEmployees }) => {
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    salary: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Trim the input value to remove leading and trailing whitespace
    const trimmedValue = value.trim();
    setNewEmployee({ ...newEmployee, [name]: trimmedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:8080/api/employees', newEmployee, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewEmployee({
        firstName: '',
        lastName: '',
        designation: '',
        salary: 0
      });
      fetchEmployees();
      window.alert('Employee created successfully!');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div className="add-employee-container">
      <h3 className="add-employee-heading">Add Employee</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={newEmployee.firstName} onChange={handleInputChange} className="add-employee-input" required />
        <input type="text" name="lastName" placeholder="Last Name" value={newEmployee.lastName} onChange={handleInputChange} className="add-employee-input" required />
        <input type="text" name="designation" placeholder="Designation" value={newEmployee.designation} onChange={handleInputChange} className="add-employee-input" required />
        <input type="number" name="salary" placeholder="Salary" value={newEmployee.salary} onChange={handleInputChange} className="add-employee-input" required />
        <button type="submit" className="add-employee-button">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
