import React from 'react';
import './Footer.css';
import footerlogo from './assets/footerlogo.png'; 


const Footer = () => {
  return (
    <footer>
     <div className="footer-container">
      <h4>Copyright &copy; Ram Thanganagai Maligai. All rights reserved.</h4>
        <h4 className="powered-by">
          Powered by <img src={footerlogo} alt="Logo" className="footer-logo" />
        </h4>
      
      </div>  
    </footer>   
  );
}

export default Footer;
