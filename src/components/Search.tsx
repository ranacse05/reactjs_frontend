import React, { useState } from 'react';
import './Search.css';

function SearchTickets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          name='search'
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search tickets..."
        />
        <span className="search-icon">🔍</span>
      </div>
      {(isFocused || searchTerm) && (
        <div className="dropdown">
          <p>No options</p>
        </div>
      )}
    </div>
  );
}

export default SearchTickets;