import React, { useState } from 'react';
import './Tabbar.css';

function Tabbar() {
  const [activeTab, setActiveTab] = useState('All');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="menu-container">
      <button
        className={activeTab === 'All' ? 'tab active' : 'tab'}
        onClick={() => handleTabClick('All')}
      >
        All
      </button>
      <button
        className={activeTab === 'Ongoing' ? 'tab active' : 'tab'}
        onClick={() => handleTabClick('Ongoing')}
      >
        Ongoing - Gang
      </button>
      <button
        className={activeTab === 'TaskClosed' ? 'tab active' : 'tab'}
        onClick={() => handleTabClick('TaskClosed')}
      >
        Task Closed - Gang
      </button>
      <button
        className={activeTab === 'Resolved' ? 'tab active' : 'tab'}
        onClick={() => handleTabClick('Resolved')}
      >
        Resolved - S&D
      </button>
    </div>
  );
}

export default Tabbar;