import React, { useState } from 'react'; 
import './Body.css'; 
import ContactForm from './ContactForm'; 
import identityImage from './bodyimage/identityimage.png';
import instantimage from './bodyimage/instantimage.png';
import govtintegimage from './bodyimage/govtintegimage.png';
import secureimage from './bodyimage/secureimage.png';
import unlockimage from './bodyimage/unlockimage.png';
import userfrndimage from './bodyimage/userfrndimage.png';
import rightarrowfront from './bodyimage/rightarrowfront.png';

const Body = () => {
  
  const [formKey, setFormKey] = useState(0); 
  const [showForm, setShowForm] = useState(false); 

  const handleContactClick = () => {
    setFormKey(prevKey => prevKey + 1); 
    setShowForm(true); 
  };

  const handleCloseForm = () => {
    setShowForm(false); 
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <div id="bodycontainer"> 
     { <div id="streamrow">
        <div id="streamdes">
          <div id="streamhead">
            Streamline <span className="identity"> Identity Verification </span> with Our Verification Suite Dashboard
          </div>
          <div id="streamdetail">
            Verify Instantly with Government API Services, Ensuring Seamless and Reliable Identity Verification for Your Customers
          </div>
          <button onClick={handleContactClick} className="clickme">
            Contact Us <img src={rightarrowfront} alt="streaming gif" className="rightarrowfr1" />
          </button>
        </div>
        <img src={identityImage} alt="streaming gif" className="streamImage"/>
      </div> }
      <div id="solbox">
        <div id="solhead">Your all-in-one solution</div>
        <div id="soldes">
          At Verification Suite, we offer a complete identity verification solution. 
          Seamlessly integrating government API services, we verify PAN cards and Aadhar cards with accuracy and efficiency. 
          With robust security measures and compliance, trust us for swift, reliable verification, all in one place
        </div>
      </div>
      <div id="instantrow">
        <div id="instabox">
          <div id="instaimage">
            <img src={instantimage} alt="streaming gif" className="lockimage"/>
          </div>
          <div id="verifyh">Instant Verification</div>
          <div id="verifytext">
            Verify details in real-time, ensuring swift and reliable identity verification for your customers.
          </div>
        </div>
        <div id="govtborder">
          <div id="govtimage">
            <img src={govtintegimage} alt="streaming gif" className="govtintegimage"/>
          </div>
          <div id="govtapi">Government API Integration</div>
          <div id="govtapitext">
            Harness the power of government-provided API services to validate information accurately.
          </div>
        </div>
      </div>

      <div id="secrow">
        <div id="secboxborder">
          <div id="secimage">
            <img src={secureimage} alt="streaming gif" className="secureimage"/>
          </div>
          <div id="sechead">Secure and Compliant</div>
          <div id="securetext">
            Your data is handled securely and in compliance with industry standards and government regulations.
          </div>
        </div>
        <div id="userborder">
          <div id="userimage">
            <img src={userfrndimage} alt="streaming gif" className="userfrndimage" />
          </div>
          <div id="frndhead">User-friendly Interface</div>
          <div id="frndtext">
            Our intuitive dashboard makes it easy to navigate and to streamline your identity verification process effortlessly.
          </div>
        </div>
      </div>
     

      <div id="powerrow">
        <div id="secimage">
          <img src={unlockimage} alt="streaming gif" className="unlockimage" />
        </div>
        <div id="powerdes">
          <div id="unlockbox">
            <div id="unlockhead">
              Unlock the Power of <span className="identity">Identity Verification</span>
            </div> 
            <div id="redydes">
              Ready to experience the benefits of our verification suite? Sign up now to unlock the full potential of identity verification for your business.
            </div> 
            <button onClick={() => { scrollToTop();}} className="hi-clickme">
              Get Started  <img src={rightarrowfront} alt="streaming gif" className="rightarrowfr1"/>
            </button>
          </div>
        </div>
      </div>
      <div id="modal" className={showForm ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
        <ContactForm key={formKey} onClose={handleCloseForm} />
        </section>
      </div>
    </div>
  );
}

export default Body;
