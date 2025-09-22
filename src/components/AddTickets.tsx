import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import './AddTickets.css';
import Modal from "./Modal";

// Initialize Parse (do this once in your app)
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");
Parse.serverURL = 'https://parseapi.back4app.com/';

const AddTickets = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    selectedOption: '' 
  });
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data using Parse SDK
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const SND = Parse.Object.extend('SND');
        const query = new Parse.Query(SND);
        const results = await query.find();
        
        const formattedOptions = results.map(item => ({
          id: item.id,
          name: item.get('name') || item.get('title') || `Item ${item.id}`
        }));
        
        setOptions(formattedOptions);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Submitted: Name: ${formData.name}, Email: ${formData.email}, Selected: ${formData.selectedOption}`);
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  return (
    <div className="add-div">
      <button className='add-button' onClick={handleOpenDialog}>Add Ticket</button>
      
      {open && (
        <Modal title="Enter Data" onClose={() => setOpen(false)}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                name="name"
                placeholder="Enter Name" 
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                name="email"
                placeholder="Enter Email" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Select Option:</label>
              {loading && <p className="loading">Loading options...</p>}
              {error && <p className="error">Error: {error}</p>}
              
              <select 
                name="selectedOption"
                value={formData.selectedOption}
                onChange={handleInputChange}
                required
                disabled={loading}
              >
                <option value="">Please select an option</option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="modal-actions">
              <button type="submit" className="btn submit-btn">
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