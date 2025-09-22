import React, { useState } from "react";
import './Table.css';
import { data } from '../Data.jsx';
import Modal from "./Modal";

export default function Table() {
  const dataToDisplay = data.tasks;

  const [counter, setCounter] = useState(0);

  const titles = [
    "SL",
    "Gang Assign Time",
    "Gang Closure Time",
    "Ticket Resolution Time (S&D resolve time)",
    "Ticket Status",
    "Dispatcher Ticket Closure Time",
    "Dispatched Time",
    "S&D Name"
  ];

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (obj) => {
    setSelectedRowData(obj);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.values(titles).map((value) => (
              <th key={value}>{value.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((obj, index) => (
            <tr key={obj.id} onClick={() => handleRowClick(obj)} style={{ cursor: 'pointer' }}>
              <td>{index + 1}</td>
              <td>{obj.assign_time || 'N/A'}</td>
              <td>{obj.closed_time || 'N/A'}</td>
              <td>{obj.resolved_time || 'N/A'}</td>
              <td 
                style={{ 
                  color: obj.status === 'RESOLVED' ? 'green' : 'inherit',
                  fontWeight: obj.status === 'RESOLVED' ? 'bold' : 'normal'
                }}
              >
                {obj.status || 'N/A'}
              </td> 
              <td>{obj.closed_time || 'N/A'}</td>
              <td>{obj.dispatch_time || 'N/A'}</td>
              <td>{obj.snd_name || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedRowData && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="modal-data">
           
              <div className="close-button" onClick={handleCloseModal}>X</div>
              <div className="single">
                <label>Calling Number</label>
                {/* <input type="text" className="input-text" value={selectedRowData.caller_contact || ''} readOnly /> */}
                {selectedRowData.caller_contact || ''}
              </div>
              <div className="single">
                <label>Complainer Name</label>
                {/* <input type="text" className="input-text"  value={selectedRowData.caller_name || ''} readOnly /> */}
                {selectedRowData.caller_name || ''}
              </div>
            <div className="single">
              <label>Complain Address</label>
              {/* <input type="text" className="input-text"   value={selectedRowData.complain_address || ''} readOnly /> */}
              {selectedRowData.complain_address || ''}
            </div>
            
            <div className="single">
                <label>Nearby Points</label>
                {/* <input type="text" className="input-text"  value={selectedRowData.nearby_points || ''} readOnly /> */}
                {selectedRowData.nearby_points || ''}
              </div>
              <div className="single">
                <label>Landmarks</label>
                {/* <input type="text" className="input-text"  value={selectedRowData.landmarks || ''} readOnly /> */}
                {selectedRowData.landmarks || ''}
              </div>
            <div className="single">
                <label>Complaint</label>
                {/* <input type="text" className="input-text"  value={selectedRowData.query_sub_category || ''} readOnly /> */}
                {selectedRowData.query_sub_category || ''}
              </div>
              <div className="single">
                <label>Assigned By</label>
                {/* <input type="text" className="input-text"  value={selectedRowData.assigned_by || ''} readOnly /> */}
                {selectedRowData.assigned_by || ''}
              </div>
            <div>
              <label>Complaint Code</label>
              {/* <input type="text" className="input-text"  value={selectedRowData.query_category || ''} readOnly /> */}
              {selectedRowData.query_category || ''}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}