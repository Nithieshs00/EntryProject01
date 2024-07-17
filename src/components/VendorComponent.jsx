import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/vendors';


const VendorComponent = () => {
    const [vendors, setVendors] = useState([]);
    const [vendorForm, setVendorForm] = useState({ name: '', email: '', upi: '' });
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedEmails, setSelectedEmails] = useState([]);

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await axios.get(API_URL);
            setVendors(response.data);
        } catch (error) {
            console.error("Error fetching vendors:", error);
        }
    };

    const createVendor = async () => {
        try {
            const response = await axios.post(API_URL, vendorForm);
            setVendors([...vendors, response.data]);
            setVendorForm({ name: '', email: '', upi: '' });
        } catch (error) {
            console.error("Error creating vendor:", error);
        }
    };

    const updateVendor = async (id) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, vendorForm);
            setVendors(vendors.map(vendor => vendor.id === id ? response.data : vendor));
            setVendorForm({ name: '', email: '', upi: '' });
            setSelectedVendor(null); // the selected vendor data reseted after being updated [state change]
        } catch (error) {
            console.error("Error updating vendor:", error);
        }
    };

    const deleteVendor = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setVendors(vendors.filter(vendor => vendor.id !== id));
        } catch (error) {
            console.error("Error deleting vendor:", error);
        }
    };

    const sendEmails = async () => {
        try {
            await axios.post(`${API_URL}/sendEmails`, selectedEmails);
            setSelectedEmails([]);  // the send list will be reseted after sending mail [state change]
            alert("Emails sent to selected vendors!");
        } catch (error) {
            console.error("Error sending emails:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedVendor) {
            updateVendor(selectedVendor.id);
        } else {
            createVendor();
        }
    };

    const handleEdit = (vendor) => {
        setVendorForm(vendor);
        setSelectedVendor(vendor);
    };

    const handleSelectEmail = (email) => {
        setSelectedEmails(prevState => prevState.includes(email) ? prevState.filter(e => e !== email) : [...prevState, email]);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Vendors</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                    {/* <label htmlFor="name">Name</label> */}
                    <input
                        type="text"
                        className="form-control mt-1"
                        id="name"
                        placeholder="Enter name"
                        value={vendorForm.name}
                        onChange={e => setVendorForm({ ...vendorForm, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    {/* <label htmlFor="email">Email</label> */}
                    <input
                        type="email"
                        className="form-control mt-1"
                        id="email"
                        placeholder="Enter email"
                        value={vendorForm.email}
                        onChange={e => setVendorForm({ ...vendorForm, email: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    {/* <label htmlFor="upi">UPI</label> */}
                    <input
                        type="text"
                        className="form-control mt-1"
                        id="upi"
                        placeholder="Enter UPI"
                        value={vendorForm.upi}
                        onChange={e => setVendorForm({ ...vendorForm, upi: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">{selectedVendor ? "Update Vendor" : "Create Vendor"}</button>
            </form>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>UPI</th>
                        <th>Actions</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map(vendor => (
                        <tr key={vendor.id}>
                            <td>{vendor.name}</td>
                            <td>{vendor.email}</td>
                            <td>{vendor.upi}</td>
                            <td>
                                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEdit(vendor)}>Edit</button>
                                <button className="btn btn-danger btn-sm mx-2" onClick={() => deleteVendor(vendor.id)}>Delete</button>
                            </td>
                            <td>
                                <input 
                                    type="checkbox"
                                    checked={selectedEmails.includes(vendor.email)}
                                    onChange={() => handleSelectEmail(vendor.email)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-success" onClick={sendEmails} disabled={selectedEmails.length === 0}>Send Emails to Selected Vendors</button>
        </div>
    );
};

export default VendorComponent;
