import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from './config/parse';
import './Login.css';

function Login({ onLoginSuccess }) {  // Receive the callback prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt started');  // Debug log
    
    try {
      const user = await Parse.User.logIn(username, password);
      console.log('Login successful:', user);
      localStorage.setItem('parseSession', user.getSessionToken());
      // Update the parent component's state first
      onLoginSuccess();
      // Then navigate
      console.log('Navigating to dashboard');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className='container'>
    <div className='image'><img src="logo.jpg" /></div>
    <div className='login-box shadow-border'>
      <h1>S&D Login</h1>
    <form onSubmit={handleLogin}>
      <h3>Employee ID</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <h3>Password</h3>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
     <p className='copy-right'>Copyright &#169; 2025 DESCO.</p>
    </form>
    </div>
    </div>
  );
}

export default Login;