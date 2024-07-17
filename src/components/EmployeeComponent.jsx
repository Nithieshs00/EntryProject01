import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/employees';

const EmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({ name: '', designation: '', ctc: '', email: '' });
    const [newEmployee, setNewEmployee] = useState({ name: '', designation: '', ctc: '', email: '' });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(API_URL);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleSelectEmployee = (id) => {
        setSelectedEmployees((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((employeeId) => employeeId !== id) : [...prevSelected, id]
        );
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, newEmployee);
            fetchEmployees();
            setNewEmployee({ name: '', designation: '', ctc: '', email: '' });
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleEditEmployee = (employee) => {
        setEditingEmployeeId(employee.id);
        setEditedEmployee({ ...employee });
    };

    const handleSaveEmployee = async (id) => {
        try {
            await axios.put(`${API_URL}/${id}`, editedEmployee);
            fetchEmployees();
            setEditingEmployeeId(null);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleDeleteEmployees = async () => {
        try {
            await Promise.all(
                selectedEmployees.map((id) => axios.delete(`${API_URL}/${id}`))
            );
            fetchEmployees();
            setSelectedEmployees([]);
        } catch (error) {
            console.error('Error deleting employees:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Employees</h2>
            <form onSubmit={handleAddEmployee} className="mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={newEmployee.name}
                            onChange={handleChange}
                            placeholder="Employee Name"
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            name="designation"
                            value={newEmployee.designation}
                            onChange={handleChange}
                            placeholder="Designation"
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            name="ctc"
                            value={newEmployee.ctc}
                            onChange={handleChange}
                            placeholder="CTC"
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={newEmployee.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="col-md-1">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Select</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>CTC</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedEmployees.includes(employee.id)}
                                    onChange={() => handleSelectEmployee(employee.id)}
                                />
                            </td>
                            <td>
                                {editingEmployeeId === employee.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={editedEmployee.name}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    employee.name
                                )}
                            </td>
                            <td>
                                {editingEmployeeId === employee.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="designation"
                                        value={editedEmployee.designation}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    employee.designation
                                )}
                            </td>
                            <td>
                                {editingEmployeeId === employee.id ? (
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="ctc"
                                        value={editedEmployee.ctc}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    employee.ctc
                                )}
                            </td>
                            <td>
                                {editingEmployeeId === employee.id ? (
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={editedEmployee.email}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    employee.email
                                )}
                            </td>
                            <td>
                                {editingEmployeeId === employee.id ? (
                                    <button className="btn btn-success mr-2" onClick={() => handleSaveEmployee(employee.id)}>Save</button>
                                ) : (
                                    <button className="btn btn-primary mr-2" onClick={() => handleEditEmployee(employee)}>Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-danger" onClick={handleDeleteEmployees}>Delete Selected</button>
        </div>
    );
};

export default EmployeeComponent;
