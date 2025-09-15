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
        <div className="add-div">
          <button className='add-button' onClick={handleOpenDialog}>Add Ticket</button>
        </div>
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