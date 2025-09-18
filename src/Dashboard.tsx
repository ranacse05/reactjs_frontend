import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navigation from './components/Nevigation';
import Tabbar from './components/Tabbar';
import AddTickets from './components/AddTickets';
import Modal from "./components/Modal";
import Analytics from './components/Analytics';


function Dashboard() {
  const [startDate, setStartDate] = useState('2025-08-18');
  const [endDate, setEndDate] = useState('2025-08-24');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);


  const handleGetData = () => {
    alert(`Fetching data from ${startDate} to ${endDate}`);
  };

  const handleOpenDialog = () =>{
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
        <button className='get-data' onClick={handleGetData}>GET DATA</button>
        <AddTickets />
        <Analytics />  
      </div>
      
    <div className="dashboard-content">
            <div className='tab-bar'>
                <Tabbar />
            </div>
            <div className='mapview'></div>
      </div>
      </>
  );
}

export default Dashboard;