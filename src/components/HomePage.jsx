import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Employee Vendor Management</h1>
            <div className="d-flex justify-content-center">
                <Link to="/employees" className="btn btn-primary m-2">Manage Employees</Link>
                <Link to="/vendors" className="btn btn-primary m-2">Manage Vendors</Link>
                <Link to="/emails" className="btn btn-primary m-2">View Sent Emails</Link>
            </div>
        </div>
    );
};

export default HomePage;
