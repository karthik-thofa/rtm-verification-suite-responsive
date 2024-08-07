import React, { useState, useEffect } from 'react';

const LoadingIndicator = ({ isLoading, children }) => {
  const [isActive, setIsActive] = useState(isLoading);

  useEffect(() => {
    setIsActive(isLoading);
  }, [isLoading]);

  const overlayStyles = {
    
    position: 'absolute',
    top: 0,
    left:0,
    right:0,
    bottom:0,
    width:'100%',
    height:'100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  
    display: isActive ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:9999, 
   
  };

  const loaderStyles = {
    width: 100,
    height: 100,
    border: '5px solid black',
    borderRadius: '50%',
    borderLeftColor: '#fffba0',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={overlayStyles}>
      {isActive && <div style={loaderStyles}></div>}
      {children}
    </div>
  );
};

export default LoadingIndicator;


const animationStyles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;


const styleTag = document.createElement('style');
styleTag.type = 'text/css'; 
styleTag.appendChild(document.createTextNode(animationStyles));
document.head.appendChild(styleTag);




