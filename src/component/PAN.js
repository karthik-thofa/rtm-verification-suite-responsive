// PAN.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PAN() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleDropdown}>PAN Component</div>
      {isOpen && (
        <ul>
          <li><Link to='/basicpan'>BasicPAN</Link></li>
          <li><Link to='/pan360'>PAN360</Link></li>
        </ul>
      )}
    </div>
  );
}

export default PAN;
