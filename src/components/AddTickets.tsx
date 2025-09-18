import React, { useState } from 'react';
import './AddTickets.css';
import Modal from "./Modal";

const AddTickets = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: Name: ${formData.name}, Email: ${formData.email}`);
    onClose();
  };

  const handleOpenDialog = () =>{
        setOpen(true);
      };
    
      const handleCloseDialog = () => {
        setIsDialogOpen(false);
      };

  return (<div className="add-div">
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
            <select>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option selected value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
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
};

export default AddTickets;