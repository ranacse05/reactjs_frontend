import React, { useState } from 'react';
import './Analytics.css';
import Modal from "./Modal";

function Analytics(){
      const [startDate, setStartDate] = useState('2025-08-18');
      const [endDate, setEndDate] = useState('2025-08-24');
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [open, setOpen] = useState(false);
    
      const handleOpenDialog = () =>{
        setOpen(true);
      };
    
      const handleCloseDialog = () => {
        setIsDialogOpen(false);
      };

    return(
    <div className='analytics'>   
        <button className='analytics-button' onClick={handleOpenDialog}>ANALYTICS</button>
    {open && (
        <Modal title="Enter Data" onClose={() => setOpen(false)}>
          <form>
            <div>
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
                </label>     `
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
    </div>
    );
}

export default Analytics;