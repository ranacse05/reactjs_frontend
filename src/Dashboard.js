import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navigation from './components/Nevigation';
import Tabbar from './components/Tabbar';
import Table from './components/Table';
import AddTickets from './components/AddTickets.js';
import Modal from "./components/Modal";


function Dashboard() {
  const [startDate, setStartDate] = useState('2025-08-18');
  const [endDate, setEndDate] = useState('2025-08-24');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);


  const handleGetData = () => {
    alert(`Fetching data from ${startDate} to ${endDate}`);
  };

  const handleAnalytics = () => {
    alert('Navigating to Analytics');
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
        <button onClick={handleGetData}>GET DATA</button>
        <button className='add-button' onClick={handleOpenDialog}>Add Ticket</button>
        {open && (
        <Modal title="Enter Data" onClose={() => setOpen(false)}>
          <form>
            <div>
              <label>Name:</label>
              <input type="text" placeholder="Enter Name" />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" placeholder="Enter Email" />
            </div>
            <div className="modal-actions">
              <button type="submit" className="btn" style={{ background: "blue", color: "white" }}>
                Submit
              </button>
              <button type="button" className="btn btn-cancel" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
       {/* isDialogOpen && <AddTickets isOpen={isDialogOpen} onClose={handleCloseDialog} /> */}
        
        <button className='analytics' onClick={handleAnalytics}>ANALYTICS</button>
      </div>
      
    <div className='tab-bar'>
        <Tabbar />
    </div>
    <div className="dashboard-content">
            <div className='tickets'>
              <Table />
            </div>
            <div className='mapview'></div>
      </div>
      </>
  );
}

export default Dashboard;