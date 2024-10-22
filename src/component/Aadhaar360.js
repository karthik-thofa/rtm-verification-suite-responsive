
import React, { useState, useEffect } from 'react';
import './Aadhaar360.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Aadhaar360PDF from './Aadhaar360PDF.js'; 
import LoadingIndicator from "./LoadingIndicator.js";
import leftArrowImage from "./picture/leftarrow.png";
import landImage from './picture/landimg.png';
import axios from 'axios';
const Aadhaar360 = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState(localStorage.getItem("aadhaarNumber") || '');
  const [otp, setOtp] = useState(localStorage.getItem("otp") || '');
  const [refId, setRefId] = useState('');
  const [verificationResult, setVerificationResult] = useState(JSON.parse(localStorage.getItem("verificationResult")));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aadhaarSubmitted, setAadhaarSubmitted] = useState(localStorage.getItem("aadhaarSubmitted") === "true");
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  const [showComponent, setShowComponent] = useState(localStorage.getItem("showComponent") === "true");
  const [errorMessage, setErrorMessage] = useState("");
  const [response, setResponse] = useState(null);
  useEffect(() => {
    localStorage.setItem("showComponent", showComponent);
  }, [showComponent]);

  useEffect(() => {
    if (verificationResult) {
      localStorage.setItem("verificationResult", JSON.stringify(verificationResult));
    } else {
      localStorage.removeItem("verificationResult");
    }
  }, [verificationResult]);

  useEffect(() => {
    if (aadhaarNumber) {
      localStorage.setItem("aadhaarNumber", aadhaarNumber);
    } else {
      localStorage.removeItem("aadhaarNumber");
    }
  }, [aadhaarNumber]);

  useEffect(() => {
    if (otp) {
      localStorage.setItem("otp", otp);
    } else {
      localStorage.removeItem("otp");
    }
  }, [otp]);

  useEffect(() => {
    if (aadhaarSubmitted) {
      localStorage.setItem("aadhaarSubmitted", "true");
    } else {
      localStorage.removeItem("aadhaarSubmitted");
    }
  }, [aadhaarSubmitted]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("verificationResult");
      localStorage.removeItem("aadhaarNumber");
      localStorage.removeItem("otp");
      localStorage.removeItem("aadhaarSubmitted");
    };
  }, []);

  const handleGenerateOtp = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      setLoading(true);

     
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}aadhaar/generateotp`,
        { aadhaar_number: aadhaarNumber },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          referrerPolicy: 'unsafe-url'
        }
      );


      //if (!response.ok) {
      //  const data = response.data;
//throw new Error(errorResponse.message || 'Failed to generate OTP');
     // }

      const data = response.data;
      if (data.status === 'SUCCESS' && data.refId) {
        setRefId(data.refId);
        setAadhaarSubmitted(true);
      } else {
        throw new Error('Failed to generate OTP');
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
      setError('Failed to generate OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const token = localStorage.getItem('accessToken');
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}aadhaar/submit`,
        { otp: otp, ref_id: refId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          referrerPolicy: 'unsafe-url'
        }
      );

    // if (!response.ok) {
     //   const errorResponse = await response.json();
     //   throw new Error(errorResponse.message || 'Failed to submit OTP');
     // }

     if (response.data && response.data.status === "VALID") {
    
      setResponse(response.data);
      console.log("OTP Verified successfully:", response.data);
  } else {
    
      setErrorMessage("Failed to verify OTP.");
  }
} catch (error) {
  setErrorMessage("Error submitting OTP: " + error.message);
  console.error("Error submitting OTP:", error);
} finally {
  setLoading(false); 
}
};

  const handleHideComponent = () => {
    setShowComponent(false); 
    setAadhaarNumber("");
    setOtp("");
    setVerificationResult(null);
    setAadhaarSubmitted(false);
    localStorage.removeItem("verificationResult");
    localStorage.removeItem("aadhaarNumber");
    localStorage.removeItem("otp");
    localStorage.removeItem("aadhaarSubmitted");
  };

  const generatePDF = () => {
    if (!response || !response.name) {
      return null; 
    }
    const fileName = `${aadhaarNumber}_${response.name}.pdf`;
  
    return (
      <PDFDownloadLink document={<Aadhaar360PDF verificationResult={response} aadhaarNumber={aadhaarNumber} />} fileName={fileName}>
        {({ loading }) => (
          loading ? (
            <button className="download-pdf-button" disabled>Loading document...</button>
          ) : (
            <button className="download-pdf-button">Download PDF</button>
          )
        )}
      </PDFDownloadLink>
    );
  };
  
  return (
    <div>
      {showComponent && (
        <div className='aadhouter'>
          <div className="go-back-container">
            <a href="#" className="back-link" onClick={handleHideComponent}>
              <img src={leftArrowImage} alt="Left Arrow" className="left-arrow" />
              <span>Go Back</span>
            </a>
          </div>
          <div className='aadhcontainer'>
            <h2 className="headingaadh">Verification Suite - Basic Aadhar Validation</h2>
            <div className="descriptionaadh">
              <p>Aadhaar is a unique 12-character alphanumeric identifier<br/>
              issued by the Income Tax Department of India. Aadhaar Card Verification ensures the<br/>
              accuracy and validity of Aadhaar details provided.</p>
            </div>
            
            {!aadhaarSubmitted && (
              <form onSubmit={handleGenerateOtp}>
                <input
                  type="text"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  placeholder="Enter Aadhaar Number"
                  autoComplete="off" 
                />
                <button type="submit" className="generate-otp-button" disabled={loading}>
                  {loading ? "Generating OTP..." : "Generate OTP"}
                </button>
              </form>
            )}
            <LoadingIndicator isLoading={loading}>
              {loading && <p className="loading"></p>}
            </LoadingIndicator>
            
            {aadhaarSubmitted && (
              <form onSubmit={handleSubmitOtp}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  autoComplete="off" 
                />
                <button type="submit" className="submit-otp-button" disabled={loading}>Submit OTP</button>
              </form>
            )}
        
        {response && response.name &&  (
              <div id="aadhaarbox">
                <div className='aadhaartable'>
                  <h2>Verification Result</h2>
                  <table>
                    <tbody>
                      <tr>
                        <td>Aadhaar Number:</td>
                        <td>{aadhaarNumber}</td>
                      </tr>
                      <tr>
                        <td>Name:</td>
                        <td>{response.name}</td>
                      </tr>
                      <tr>
                        <td>Guardian's Name:</td>
                        <td>{response.careOf}</td>
                      </tr>
                      <tr>
                        <td>Reference ID:</td>
                        <td>{response.refId}</td>
                      </tr>
                      <tr>
                        <td>Gender:</td>
                        <td>{response.gender}</td>
                      </tr>
                      <tr>
                        <td>DOB:</td>
                        <td>{response.dob}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{response.email}</td>
                      </tr>
                      <tr>
                        <td>Mobile Number:</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>Valid:</td>
                        <td>{response.status === 'VALID' ? 'Yes' : 'No'}</td>
                      </tr>
                      <tr>
                        <td>Message:</td>
                        <td>{response.message}</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td>{response.address}</td>
                      </tr>
                      <tr>
                        <td>Photo:</td>
                        <td>
                          {response.photoLink && (
                            <img src={`data:image/jpeg;base64,${response.photoLink}`} alt="Verification Photo" />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {response && generatePDF()}
                  {error && <p className="error">{error}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {!showComponent && (
        <div id="pan360banner">
          <h3>Verification Suite - Basic Aadhaar</h3>
          <div id="backimg360" className="backimg360-container" style={{ backgroundImage: `url(${landImage})` }}>
            <div className="verifytext">Verify the Aadhaar information of your users</div>
            <div className="verifypara">
              <p>With our Aadhaar OKYC APIs, quickly verify whether the</p>
              <p>user identity matches the aadhaar information</p>
            </div>
            <button className="useaadhaar-button" onClick={() => setShowComponent(true)}>Use Aadhaar Verification</button>
            <button className="viewhistoryaadhaar">View history</button>
          </div>
          <div id="aadhworkdes">
            <div className="aadhwork">How does Basic Aadhaar verification work?</div>
            <div className="aadh360row">
              <div className="aadhdatasubdes">
                <div className="aadhdatasub">Enter Aadhar Details</div>
                <div className="aadhdataline"></div>
                <div className="aadhdatainput">Users input their Aadhaar card number for verification purposes.</div>
              </div>
              <div className="aadhvaliddes">
                <div className="aadhvalidprocess">Validation Process</div>
                <div className="aadhvalidline"></div>
                <div className="aadhsubdata">By submitting the OTP received on the phone number, the submitted data is cross-referenced with authoritative databases to confirm its accuracy and authenticity.</div>
              </div>
              <div className="aadhoutdes">
                <div className="aadhoutnot">View Response</div>
                <div className="aadhoutline"></div>
                <div className="aadhinformed">View the status and the complete aadhaar information of the user</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aadhaar360;

