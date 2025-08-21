import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Parse from './config/parse';

function Dashboard({ onLogout }) {  // Receive onLogout callback
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log('Attempting logout...');
      await Parse.User.logOut();
      
      // Clear local storage
      localStorage.removeItem('parseSession');
      
      // Call the logout callback if provided
      if (onLogout) onLogout();
      
      // Redirect to login page
      navigate('/login');
      console.log('Logout successful');
      
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div>
    <header className='flex-container shadow-border'>
      <img src='desco-logo.png' height='80px' />
      <div className='header-text'>
        <div className='snd'>S&D Dashboard</div>
        <p>Aagargone S&D Division</p>
      </div>
      <input type='text' className='search' placeholder='Search tickets.....'></input>
      <div className='right-side'>
          <div className='account-type'>S&D Head</div>
          <div className='notification'>
              <div className='total_notifications'>2</div>
          </div> 
          <div className='name'>R</div>
      </div>
    </header>
    <div>
      <h1>Welcome to Dashboard</h1>
      <p>You are successfully logged in!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
}

export default Dashboard;