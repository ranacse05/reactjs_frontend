import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navigation from './components/Nevigation';
import Tabbar from './components/Tabbar';

function Dashboard() {
  const [startDate, setStartDate] = useState('2025-08-18');
  const [endDate, setEndDate] = useState('2025-08-24');

  const handleGetData = () => {
    alert(`Fetching data from ${startDate} to ${endDate}`);
  };

  const handleAnalytics = () => {
    alert('Navigating to Analytics');
  };
  
  return (
    <>
    <div className="dashboard-container">
      <Navigation />
    </div>
    <div className="date-inputs">
        <label>
          Start
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <span>→</span>
        <label>
          End
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={handleGetData}>GET DATA</button>
        <button className='analytics' onClick={handleAnalytics}>ANALYTICS</button>
      </div>
      
    <div className='tab-bar'>
        <Tabbar />
    </div>
    <div className="dashboard-content">
            <div className='tickets'></div>
            <div className='mapview'></div>
      </div>
      </>
  );
}

export default Dashboard;