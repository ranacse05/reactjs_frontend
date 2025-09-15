import React, { useState } from 'react';
import './Tabbar.css';
import Table from './Table';

function Tabbar() {
  const [activeTab, setActiveTab] = useState('All');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Dummy content for each tab
  const tabContent = {
    All: <Table />,
    Ongoing: <p>Ongoing tickets content goes here.</p>,
    TaskClosed: <p>Task Closed tickets content goes here.</p>,
    Resolved: <p>Resolved tickets content goes here.</p>,
  };

  return (
    <div className="tabbar-container">
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

      <div className="tickets">
        {tabContent[activeTab]}
      </div>

    </div>
  );
}

export default Tabbar;
