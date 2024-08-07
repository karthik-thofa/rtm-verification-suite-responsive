import React, { useEffect } from 'react';
import './Introduction.css';
import identityImage from './bodyimage/identityimage.png';
import instantimage from './bodyimage/instantimage.png';
import govtintegimage from './bodyimage/govtintegimage.png';
import secureimage from './bodyimage/secureimage.png';
import unlockimage from './bodyimage/unlockimage.png';
import userfrndimage from './bodyimage/userfrndimage.png';
import pancardman from './bodyimage/pancardman.png';
import aadhaarthumbicon from './bodyimage/aadhaarthumbicon.png';
import { Link, useNavigate } from 'react-router-dom';
import footerlogo from '../assets/footerlogo.png';  

const Introduction = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            
            navigate('/');
        }
    }, [navigate]);

const PanCardBox = () => {
    const navigate = useNavigate(); 

    const handleContainerClick = () => {
        navigate('/pan360');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div id="pancardbox" onClick={handleContainerClick}>
            <div id="instaimage">
                <img src={pancardman} alt="streaming gif" className="pancardman"/>
            </div>
            <div id="panverifyhead">Pan Card Verification</div>
            <div id="panverifytext">Easily verify PAN card details with our intuitive interface. 
            Download verified information instantly in PDF format for convenient record-keeping.</div>
        </div>
    );
}

const AadharCardBox = () => {
    const navigate = useNavigate(); 

    const handleContainerClick = () => {
        navigate('/aadhaar360');
    };

    return (
        <div id="effortborder" onClick={handleContainerClick}>
            <div id="govtimage">  
                <img src={aadhaarthumbicon} alt="streaming gif" className="aadhaarthumbicon"/>
            </div>
            <div id="efforthead">Aadhar Card Verification</div>
            <div id="effortdet">
                Effortlessly authenticate Aadhar card details with our user-friendly system. 
                Access verified information and conveniently download it as a PDF for your records.
            </div>
        </div>
    );
}



    return (
        <div id="introductioncont"> 
            <div id="offerbox">
                <div id="offerhead">What We Offer</div>
                <div id="expdet">Explore our comprehensive verification services tailored to meet your identity 
                authentication needs. With our PAN and Aadhar card verification solutions, 
                rest assured of accurate and compliant results. Streamline your verification processes effortlessly, enhancing security and trust for your business and customers alike. Partner with us to unlock the full potential of seamless identity verification.</div>
            </div>

            <div id="pancardrow">
                <PanCardBox />
                <AadharCardBox />  
            </div>

            <div id="solbox">
                <div id="solhead">Your all-in-one solution</div>
                <div id="soldes1">At Verification Suite, we offer a complete identity verification solution. 
                Seamlessly integrating government API services, we verify PAN cards and Aadhar cards with accuracy and efficiency. 
                With robust security measures and compliance, trust us for swift, reliable verification, all in one place</div>
            </div>

            <div id="instantrow">
                <div id="instabox">
                    <div id="instaimage">  <img src={instantimage} alt="streaming gif" className="lockimage"/></div>
                    <div id="verifyh">Instant Verification</div>
                    <div id="verifytext">Verify details in real-time, ensuring swift and reliable identity verification for your customers.</div>
                </div>
                <div id="govtborder">
                    <div id="govtimage">  <img src={govtintegimage} alt="streaming gif" className="govtintegimage"/></div>
                    <div id="govtapi">Government API Integration</div>
                    <div id="govtapitext">Harness the power of government-provided API services to validate information accurately.</div>
                </div>
            </div>

            <div id="secrow">
                <div id="secboxborder">
                    <div id="secimage">  <img src={secureimage} alt="streaming gif" className="secureimage"/></div>
                    <div id="sechead">Secure and Compliant</div>
                    <div id="securetext">Your data is handled securely and in compliance with industry standards and government regulations.</div>
                </div>
                <div id="userborder">
                    <div id="userimage">  <img src={userfrndimage} alt="streaming gif" className="userfrndimage" /></div>
                    <div id="frndhead">User-friendly Interface</div>
                    <div id="frndtext">Our intuitive dashboard makes it easy to navigate and to streamline your identity verification process effortlessly.</div>
                </div>
            </div>
        </div>

        
    );
}

export default Introduction;
