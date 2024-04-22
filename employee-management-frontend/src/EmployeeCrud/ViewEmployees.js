import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ViewEmployees.css';

const ViewEmployees = ({ handleUpdateEmployee, handleDeleteEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchEmployees();
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8080/api/employees', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const formattedEmployees = response.data.map(employee => {
        const [firstName, lastName] = employee.fullName.split(' ');
        return {
          ...employee,
          firstName,
          lastName,
          edit: false
        };
      });

      setEmployees(formattedEmployees);
      setError('');
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to fetch employees. Please try again later.');
    }
  };

  const handleUpdate = async (id, updatedEmployeeData) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:8080/api/employees/${id}`, updatedEmployeeData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchEmployees(); // Fetch updated list of employees after updating
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Failed to update employee. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:8080/api/employees/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('Failed to delete employee. Please try again later.');
    }
  };

  return (
    <div className="view-employees-container">
      <h2 className="view-employees-heading">Employees</h2>
      {error && <p className="view-employees-error">{error}</p>}
      <table className="employee-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Designation</th>
            <th>Salary</th>
            {userRole === 'ROLE_ADMIN' && <th>Created By</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id} className="employee-row">
              <td>
                {employee.edit ? (
                  <input
                    type="text"
                    value={employee.firstName}
                    onChange={(e) => {
                      const updatedEmployees = employees.map(emp => {
                        if (emp.id === employee.id) {
                          return { ...emp, firstName: e.target.value };
                        }
                        return emp;
                      });
                      setEmployees(updatedEmployees);
                    }}
                  />
                ) : (
                  employee.firstName
                )}
              </td>
              <td>
                {employee.edit ? (
                  <input
                    type="text"
                    value={employee.lastName}
                    onChange={(e) => {
                      const updatedEmployees = employees.map(emp => {
                        if (emp.id === employee.id) {
                          return { ...emp, lastName: e.target.value };
                        }
                        return emp;
                      });
                      setEmployees(updatedEmployees);
                    }}
                  />
                ) : (
                  employee.lastName
                )}
              </td>
              <td>
                {employee.edit ? (
                  <input
                    type="text"
                    value={employee.designation}
                    onChange={(e) => {
                      const updatedEmployees = employees.map(emp => {
                        if (emp.id === employee.id) {
                          return { ...emp, designation: e.target.value };
                        }
                        return emp;
                      });
                      setEmployees(updatedEmployees);
                    }}
                  />
                ) : (
                  employee.designation
                )}
              </td>
              <td>
                {employee.edit ? (
                  <input
                    type="number"
                    value={employee.salary}
                    onChange={(e) => {
                      const updatedEmployees = employees.map(emp => {
                        if (emp.id === employee.id) {
                          return { ...emp, salary: e.target.value };
                        }
                        return emp;
                      });
                      setEmployees(updatedEmployees);
                    }}
                  />
                ) : (
                  employee.salary
                )}
              </td>
              {userRole === 'ROLE_ADMIN' && <td>{employee.createdBy}</td>}
              <td>
                {employee.edit ? (
                  <div>
                    <button onClick={() => handleUpdate(employee.id, employee)}>Save</button>
                    <button onClick={() => setEmployees(employees.map(emp => emp.id === employee.id ? { ...emp, edit: false } : emp))}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setEmployees(employees.map(emp => emp.id === employee.id ? { ...emp, edit: true } : emp))}>Edit</button>
                )}
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployees;
