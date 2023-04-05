import React from "react";
import "../css/Modal.css"

const Modal = ({ onClose, children }) => {

    
    return (
      <div className="modal-overlay">
        <div className="modal">
        {children}
          <div className="button-container">
            <button className="modal-close narrow-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;