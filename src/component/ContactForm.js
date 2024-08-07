import React, { useState } from 'react';
import './ContactForm.css'; // Import the CSS file
import footerlogoform from '../assets/footerlogo.png'; 
import closeimage from '../assets/closeimage.png'; 
import thumbsup from '../assets/thumbsup.png';

const ContactForm = ({ onSubmit, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose(); 
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div id="salesimagebox">
        <div id="salesservice">Contact our Sales Team to learn more about our services.</div>   
        <button type="button" style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer' }} onClick={handleClose}>
          <img src={closeimage} alt="streaming gif" className="closeimage"/>
        </button>
      </div>
      {submitted ? (
            
        <div className="imagemessage">
          <img src={thumbsup} alt="streaming gif" className="thumbsup"/>
          <div className="submitted-message">
          Thanks for reaching out to us! Our team will be in touch with you shortly.
          </div>
        </div>
      ) : (
        <div>
          <div>
            <input type="text" name="name" placeholder="Name" required />
          </div>
          <div>
            <input type="tel" name="phone" placeholder="Phone Number*" required />
          </div>
          <div>
            <input type="email" name="email" placeholder="Email address" required />
          </div>
          <div>
            <textarea name="message" rows="4" placeholder="Message" required />
          </div>
          <button type="submit">Submit</button>
        </div>
      )}
      <div id="formfooter">
        <h4 className="form-powered-by">
          <div id="powtext">Powered by </div> <img src={footerlogoform} alt="Logo" className="footer-logo-form" />
        </h4>
        <div id="salesinfo">Contact us: +91 97313 72191</div>
      </div>
    </form>
  );
};

export default ContactForm;
