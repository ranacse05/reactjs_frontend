import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import './AddTickets.css';
import Modal from "./Modal";

const AddTickets = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    selectedSND: '',
    selectedCategory: '',
    ticketType: 'complaint' // Default to complaint
  });
  const [sndOptions, setSndOptions] = useState([]);
  const [allCategories, setAllCategories] = useState([]); // Store all categories
  const [filteredCategories, setFilteredCategories] = useState([]); // Store filtered categories
  const [loading, setLoading] = useState({ snd: false, category: false });
  const [error, setError] = useState(null);

  // Fetch SND and Category data when component mounts
  useEffect(() => {
    // Fetch SND data using Parse SDK
    const fetchSNDData = async () => {
      setLoading(prev => ({ ...prev, snd: true }));
      setError(null);
      
      try {
        const SND = Parse.Object.extend('SND');
        const query = new Parse.Query(SND);
        const results = await query.find();
        
        const formattedOptions = results.map(item => ({
          id: item.id,
          code: item.get('sndCode'),
          name: item.get('sndName')
        }));

        setSndOptions(formattedOptions);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching SND data:', err);
      } finally {
        setLoading(prev => ({ ...prev, snd: false }));
      }
    };

    // Fetch all Category data using Parse SDK
    const fetchCategoryData = async () => {
      setLoading(prev => ({ ...prev, category: true }));
      setError(null);
      
      try {
        const Category = Parse.Object.extend('Categories');
        const query = new Parse.Query(Category);
        const results = await query.find();
        
        const formattedOptions = results.map(item => ({
          id: item.categoryId,
          name: item.get('categoryName'),
          type: item.get('type') // Assuming you have a 'type' field
        }));

        setAllCategories(formattedOptions);
        // Initially filter based on default ticketType (complaint)
        const filtered = formattedOptions.filter(item => 
          item.type?.toLowerCase() === formData.ticketType
        );
        setFilteredCategories(filtered);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching Category data:', err);
      } finally {
        setLoading(prev => ({ ...prev, category: false }));
      }
    };

    fetchSNDData();
    fetchCategoryData();
  }, []); // Empty dependency array means this runs once on mount

  // Effect to filter categories when ticketType changes
  useEffect(() => {
    if (allCategories.length > 0) {
      const filtered = allCategories.filter(item => 
        item.type?.toLowerCase() === formData.ticketType
      );
      setFilteredCategories(filtered);
      
      // Reset selected category if it doesn't exist in the filtered list
      if (formData.selectedCategory && 
          !filtered.some(cat => cat.id === formData.selectedCategory)) {
        setFormData(prev => ({ ...prev, selectedCategory: '' }));
      }
    }
  }, [formData.ticketType, allCategories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Submitted: Name: ${formData.name}, Email: ${formData.email}, SND: ${formData.selectedSND}, Category: ${formData.selectedCategory}, Type: ${formData.ticketType}`);
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    // Reset form data when closing, but keep the dropdown selections
    setFormData({ 
      name: '', 
      email: '', 
      selectedSND: formData.selectedSND,
      selectedCategory: formData.selectedCategory,
      ticketType: formData.ticketType
    });
  };

  return (
    <div className="add-div">
      <button className='add-button' onClick={handleOpenDialog}>Add Ticket</button>
      
      {open && (
        <Modal title="Enter Data" onClose={handleCloseDialog}>
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
              <label>SND Name:</label>
              {loading.snd && <p className="loading">Loading SND options...</p>}
              
              <select 
                name="selectedSND"
                value={formData.selectedSND}
                onChange={handleInputChange}
                required
                disabled={loading.snd}
              >
                <option value="">Please select an SND</option>
                {sndOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Radio buttons for ticket type */}
            <div className="form-group">
              <label>Ticket Type:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="ticketType"
                    value="complaint"
                    checked={formData.ticketType === 'complaint'}
                    onChange={handleInputChange}
                  />
                  Complaint
                </label>
                <label>
                  <input
                    type="radio"
                    name="ticketType"
                    value="query"
                    checked={formData.ticketType === 'query'}
                    onChange={handleInputChange}
                  />
                  Query
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Category:</label>
              {loading.category && <p className="loading">Loading category options...</p>}
              
              <select 
                name="selectedCategory"
                value={formData.selectedCategory}
                onChange={handleInputChange}
                required
                disabled={loading.category || filteredCategories.length === 0}
              >
                <option value="">Please select a category</option>
                {filteredCategories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {filteredCategories.length === 0 && !loading.category && (
                <p className="no-options">No categories available for {formData.ticketType}</p>
              )}
            </div>
            
            {error && <p className="error">Error: {error}</p>}
            
            <div className="modal-actions">
              <button type="submit" className="btn submit-btn">
                Submit
              </button>
              <button type="button" className="btn btn-cancel" onClick={handleCloseDialog}>
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