import React, { useState, useEffect } from 'react';
import EmailService from './api/EmailApiService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SentMailsComponent = () => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        fetchEmails();
    }, []);

    const fetchEmails = async () => {
        try {
            const response = await EmailService.getEmails();
            setEmails(response.data);
        } catch (error) {
            console.error('Error fetching emails:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Sent Emails</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Vendor Name</th>
                        <th>Vendor Email</th>
                        <th>Email Content</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((email) => (
                        <tr key={email.id}>
                            <td>{email.vendorName}</td>
                            <td>{email.vendorEmail}</td>
                            <td>{email.emailContent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SentMailsComponent;
