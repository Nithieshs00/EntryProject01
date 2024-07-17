import React, { useState } from 'react';
import './Login.css'; // Importing CSS for styling
import { useAuth } from './security/AuthContext';
import {useNavigate} from "react-router-dom";

const Login = () => {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [showErrorMessage,setShowErrorMessage] = useState(false);

  const authContext = useAuth()
  const navigate = useNavigate()

  function handleUsernameChange(event){
    setUsername(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  function handleSubmit(){
    if(authContext.login(username,password)){
      navigate(`/homepage`) //navigate to homepage after authentication [success]
    }else{
      setShowErrorMessage(true)
    }
  }

  return (
    <div className="login-container">
      <div className="left-side">
        <h1 className="title">E-V Manager</h1>
      </div>
      <div className="right-side">
        {/* write design for error */}
      {showErrorMessage && <div className="errorMessage">Authentication Failed.
        Please check your credentials.</div>}
        <form className="login-form">
          <input type="text" placeholder="Username" name="username" className="input-field"
                  onChange={handleUsernameChange} value={username}/>
          <input type="password" placeholder="Password" name="password" className="input-field"
                  onChange={handlePasswordChange} value={password} />
          <button type="submit" name="login" onClick={handleSubmit} className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
