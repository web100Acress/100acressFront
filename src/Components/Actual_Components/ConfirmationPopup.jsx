import React from 'react';

const ConfirmationPopup = ({ isOpen, message, onCancel, onConfirm }) => {
  return (
    <div className={`confirmation-popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;