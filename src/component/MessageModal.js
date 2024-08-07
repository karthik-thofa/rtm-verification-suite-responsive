// MessageModal.js
import React, { useEffect } from 'react';
import './MessageModal.css';

const MessageModal = ({ type, message, onClose }) => {
  useEffect(() => {
    // Automatically close the modal after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`message-modal ${type}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <div className="message-content">
        {message}
      </div>
    </div>
  );
};

export default MessageModal;
