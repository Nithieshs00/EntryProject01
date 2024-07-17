import axios from 'axios';

const API_URL = 'http://localhost:8080/emails';

const getEmails = async () => {
    try {
        return await axios.get(API_URL);
    } catch (error) {
        throw new Error('Error fetching emails:', error);
    }
};

const EmailService = {
    getEmails
};

export default EmailService;
