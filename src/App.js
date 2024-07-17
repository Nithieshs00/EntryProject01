import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import EmployeeComponent from './components/EmployeeComponent';
import VendorComponent from './components/VendorComponent';
import SentMailsComponent from './components/SentMailsComponent';
import Login from './components/Login';
import HeaderComponent from './components/HeaderComponent';
import LogoutComponent from './components/Logout';
import ErrorComponent from './components/ErrorComponent';
import AuthProvider, { useAuth } from './components/security/AuthContext';

function AuthenticatedRoute({ children }) {
    const authContext = useAuth()

    if (authContext.isAuthenticated) {
        return children
    }

    return <Navigate to="/" />
}

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <HeaderComponent />
                <div>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/homepage" element={
                            <AuthenticatedRoute>
                                <HomePage />
                            </AuthenticatedRoute>} />
                        <Route path="/employees" element={
                            <AuthenticatedRoute>
                                <EmployeeComponent />
                            </AuthenticatedRoute>} />
                        <Route path="/vendors" element={
                            <AuthenticatedRoute>
                                <VendorComponent />
                            </AuthenticatedRoute>} />
                        <Route path="/emails" element={
                            <AuthenticatedRoute>
                                <SentMailsComponent />
                            </AuthenticatedRoute>} />
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                            <LogoutComponent />
                        </AuthenticatedRoute>} />
                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
