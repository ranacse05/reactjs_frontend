import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ title, children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body // 👈 ensures it renders above everything else
  );
};

export default Modal;
