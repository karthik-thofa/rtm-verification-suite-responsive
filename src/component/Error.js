import React from 'react';
import './Error.css'; 

const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">Error 404: Page Not Found</h1>
      <p className="error-message">The page you are looking for does not exist.</p>
    </div>
  );
};

export default Error;
